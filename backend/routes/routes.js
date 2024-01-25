const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const Note = require("../models/note_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = router; // export the router to be used elsewhere

// Register Method
router.post("/register", async (req, res) => {
  const { user: username, pass: password, email: email } = req.body;
  console.log(
    "Register request recieved with, ",
    username,
    password,
    email,
  );
  console.log("Req.body: ", req.body);

  try {
    // confirm that no one has registered this username
    const existingUser = await User.findOne({ user: username });
    console.log("Existing user, ", existingUser);
    if (existingUser === null) {
      
      //   res.status(400).json({ message: "User already exists" });
      // }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        user: username,
        email: email,
        pass: hashedPassword,
        notes: [],
      });
      console.log("Registering new user, ", newUser);
      const userToSave = await newUser.save();

      // generate a jwt to send back to the front end
      const token = jwt.sign(
        {
          user: userToSave.user,
          id: userToSave._id,
        },
        "secret",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ user: userToSave, id: token });
    } else {
      res.status(200).json({ message: "User is already registered" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN Method
router.post("/login", async (req, res) => {
  console.log("Login request recieved");
  const { user, pass } = req.body;
  try {
    const userData = await User.findOne({ user });
    console.log(userData);
    if (userData) {
      const isMatch = await bcrypt.compare(pass, userData.pass);
      if (isMatch) {
        // generate a jwt to send to front end
        const token = jwt.sign({ user, pass }, "secret", {
          expiresIn: "1h",
        });
        res.status(200).json({ userData, token });
      }
    } else {
      res
        .status(401)
        .json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Note APIs
// create a new note
router.post("/addNote", async (req, res) => {
  try {

    const date = req.body.date;
    const title = req.body.title;
    const content = req.body.content;
    const userID = req.body.userID;

    console.log(date, title, content, userID)

    // Create and save a new note
    const newNote = new Note({
      date,
      title,
      content,
    });

    const savedNote = await newNote.save();

    // Find the user by ID and add the note
    const user = await User.findById(userID);
    user.notes.push(savedNote._id);
    await user.save();
    const populatedUser = await User.findById(userID).populate("notes");
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Query all notes for a given user
router.get("/retrieveAllNotes", async (req, res) => {
  console.log(`Request recieved with userID: ${req.query.userID}`);
  try {
    const user = await User.findById(req.query.userID).populate("notes");
    const notes = user.notes;

    res.status(201).json(notes);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// delete a note given the noteID and the userID
router.delete("/deleteNote", async (req, res) => {
  console.log("Delete note called with body, ", req.body);
  try {
    const note_id = req.body.noteID;
    const user_id = req.body.userID;

    // remove the note from the list of user notes
    const user_obj = await User.findById(user_id);
    const user_notes = user_obj.notes.pull(note_id);
    // reassign the users notes list
    const user = await User.findByIdAndUpdate(
      user_id,
      { $set: { notes: user_notes } },
      { new: true }
    );

    // remove the note from the note collection
    const deleted_note = await Note.findByIdAndDelete(note_id);

    res.status(200).json(deleted_note);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// update an existing note
router.post("/updateNote", async (req, res) => {
  console.log(
    `Updating noteID: ${req.body.data.noteID} and new content: ${req.body.data.content}`
  );
  try {
    const note_id = req.body.data.noteID;
    // const content = req.body.content;

    const note = await Note.findByIdAndUpdate(
      note_id,
      { $set: { content: req.body.data.content } },
      { new: true }
    );

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
