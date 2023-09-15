import React, { useEffect, useState } from 'react'

// Import created components
import ControlBar from './ControlBar'
import NoteEditor from './NoteEditor'

// Import note operation functions
import { addNote, 
  getNotes, 
  updateNote, 
  deleteNote } from '../../services/noteFunctionalitiesServices'

// Import stylesheet
import './Home.css'

export default function Home({ user }) {

  // State var to hold the note currently displayed by the editor
  const [selectedNote, setSelectedNote] = useState({
    userID: user._id,
    noteID: 'new_note',
    title: '',
    content: '',
    editedContent: '',
    date: new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York', 
      year: '2-digit', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' })
  })

  const [selectedInd, setSelectedInd] = useState('new_note')
  const [userNotes, setUserNotes] = useState([])
  const [editsMade, setEditsMade] = useState(true)

  // Initially set the Title of a note
  const handleTitleChange = (event) => {
    setSelectedNote({
      ...selectedNote,
      title: event.target.value,
    });
  };

  // Make updates to the content of the note
  const handleContentChange = (event) => {
    const newEditedContent = event.target.value;
    setSelectedNote({
      ...selectedNote,
      editedContent: newEditedContent,
    });

    // Update userNotes with the latest editedContent
    setUserNotes((prevUserNotes) => {
      const updatedUserNotes = [...prevUserNotes];
      if (selectedInd !== 'new_note') {
        updatedUserNotes[selectedInd] = {
          ...updatedUserNotes[selectedInd],
          editedContent: newEditedContent,
        };
      }
      return updatedUserNotes;
    });
  };

  // Save note function
  const handleSave = async () => {
    // case where we are creating a new note
    if (selectedNote.noteID == 'new_note'){
      const response = await addNote(
        selectedNote.userID,
        selectedNote.date,
        selectedNote.title,
        selectedNote.editedContent)
      
      // Update user notes to include the newest node
      setUserNotes(response)
    } else {
    // case where we are creating a new note
      const updatedNote = await updateNote(selectedNote.noteID, selectedNote.editedContent)
      updatedNote.editedContent = updatedNote.content

      const newUserNotes = [...userNotes]
      newUserNotes[selectedInd] = updatedNote
      
      setUserNotes(newUserNotes)
    }
    // update the users stored notes
  }

  // handle select note or select new_note
  const handleSelectNote = (index) => {
    if (index == 'new_note'){
      setSelectedNote({
        ...selectedNote,
        noteID: 'new_note',
        content: '',
        editedContent: '',
        title: '',
        date: new Date().toLocaleString('en-US', { 
          timeZone: 'America/New_York', 
          year: '2-digit', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      })
    } else {
      console.log('Notes on note switch: ', userNotes)
      const note = userNotes[index]
      setSelectedNote({
        ...selectedNote,
        noteID: note._id,
        content: note.content,
        editedContent: note.editedContent,
        date: note.date,
        title: note.title
      })
    }
    setSelectedInd(index)
  }

  // Function to pull notes from database
  const handleGetNotes = async () => {
    // retrieve notes from database
    const userNotes = await getNotes(user._id)
    // add an edited content item to each of the notes
    for (const note of userNotes){
      note.editedContent = note.content
    }
    setUserNotes(userNotes)
  }

  const handleDeleteNote = async () => {
    // delete the note and update the list of displayed notes
    const response = await deleteNote(selectedNote.userID, selectedNote.noteID)
    console.log('Response from delete note', response)
    
    // remove the deleted note from the displayed notes
    setUserNotes((prevUserNotes) => 
      prevUserNotes.filter((note) => note._id !== response._id))

    // reassign the selected note to be the first note in the list
    if (userNotes != []){
      // if the list is not empty assign the selected note to the first element
      handleSelectNote(0)
    } else {
      // if the list is empty assign it to the new note editor
      
    }
  }

  // useEffect to generate a new list of notes each time:
  // - when a note is updated
  // - when a note is added or deleted
  // - when the component is initially rendered
  useEffect(() => {
    handleGetNotes()
  }, [])

  useEffect(() => {
    if (selectedNote.content === selectedNote.editedContent){
      setEditsMade(false)
    } else {
      setEditsMade(true)
    }
  }, [selectedNote])

  return (
    <div className='homeContainer'>
      <ControlBar 
        notes={userNotes}
        selected_ind={selectedInd}
        selectNote={handleSelectNote} 
        handleSave={handleSave}
        handleDeleteNote={handleDeleteNote}
        editsMade={editsMade}/>
      <NoteEditor 
        note={selectedNote}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}/>
    </div>
  )
}
