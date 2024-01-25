// Functions to handle create, edit, delete, view notes
import axios from "axios";

// Query notes for a given user
export async function queryNotes (userID) {
  console.log(`Query for userID: ${userID} notes`)
  try {
    const response = await axios.get(
      `http://localhost:3000/api/retrieveAllNotes`,
      {
        params: {
          userID: userID,
        },
      }
    );
    console.log("User Notes ", response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

// Create a new note
export async function createNote(userID, date, title, content) {
  console.log(`New Note: \n${userID}, \n${date}, \n${title}, \n${content}`)
  const data = {
    userID: userID,
    date: date, 
    title: title,
    content: content
  }
  try {
    const response = await axios.post(
      `http://localhost:3000/api/addNote`, data
      );
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Update an existing note
export async function updateNote(noteID, content) {
  console.log(`Updating note:${noteID} with content:${content}`);
  const data = {
    noteID: noteID,
    content: content,
  };
  try {
    const response = await axios.post(`http://localhost:3000/api/updateNote`, {
      data: data,
    });
    console.log('from update note service', response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}


// Delete a note
export async function deleteNote(userID, noteID){
  console.log(`Deleting note from user: ${userID} with id: ${noteID}`);
  const data = {
    userID: userID,
    noteID: noteID,
  };
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/deleteNote",
      { data: data }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}