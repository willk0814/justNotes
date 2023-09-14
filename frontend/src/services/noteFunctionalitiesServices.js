import axios from "axios";

// Create new note
export async function addNote(userID, date, title, content) {
  console.log(`Creating a new note, 
    \nuser: ${userID}, 
    \ndata: ${date}, 
    \ntitle: ${title}, 
    \ncontent: ${content}`)
  const data = {
    userID: userID,
    title: title,
    date: date,
    content: content,
  };
  try {
    const response = await axios.post(
      `http://localhost:3000/api/addNote`,
      data
    );
    console.log("Updated user notes, ", response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}


// Query notes for a user
export async function getNotes(userID) {
  console.log(`Retrieving notes for user: ${userID}`);
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

// Update existing notes
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

// Delete note
export async function deleteNote(userID, noteID) {
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