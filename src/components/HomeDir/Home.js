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
    userID: user.userData._id,
    noteID: 'new_note',
    title: '',
    content: '',
    date: new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York', 
      year: '2-digit', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' })
  })

  const [userNotes, setUserNotes] = useState([])

  const handleTitleChange = (event) => {
    setSelectedNote({
      ...selectedNote,
      title: event.target.value,
    });
  };

  const handleContentChange = (event) => {
    setSelectedNote({
      ...selectedNote,
      content: event.target.value,
    });
  };

  const handleSave = async () => {
    if (selectedNote.noteID == 'new_note'){
      const response = await addNote(
        selectedNote.userID,
        selectedNote.date,
        selectedNote.title,
        selectedNote.content)
      setUserNotes(response)
    } else {

    }
    // update the users stored notes

  }

  const handleAddNote = () => {

  }

  const handleGetNotes = async () => {
    const response = await getNotes(user.userData._id)
    console.log(response)
    setUserNotes(response)
  }

  const handleUpdateNote = () => {
    
  }

  const handleDeleteNote = () => {
    
  }

  useEffect(() => {
    handleGetNotes()
  }, [])

  return (
    <div className='homeContainer'>
      <ControlBar notes={userNotes} handleSave={handleSave}/>
      <NoteEditor 
        note={selectedNote}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}/>
    </div>
  )
}
