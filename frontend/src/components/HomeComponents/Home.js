import React, {useEffect, useState} from 'react'

// Import Navbar, Editor, and EditorToolbar components
import Navbar from './Navbar'
import Editor from './Editor'
import EditorToolbar from './EditorToolbar'

// Import Note functionalities
import { queryNotes, createNote, deleteNote, updateNote } from '../../services/noteServices'

export default function Home({ user, handleLogout }) {

  // SV to manage all of a users notes
  const [notes, setNotes] = useState([])
  // SV to hold selected_note 
  const [selectedNote, setSelectedNote] = useState({})
  // SV to manage save availability
  const [saveAvailable, setSaveAvailable] = useState(false)
  

  // Function to query for notes, called in useEffect
  const handleQueryNotes = async () => {
    const response = await queryNotes(user.id)

    // add an edited content field to each note
    for (const note of response) {
      note.editedContent = note.content
      note.editedTitle = note.title
    }

    if (response.length > 0){
      // assign SV for notes
    setNotes(response)

    // assign SV for selected notes
    setSelectedNote(response[0])
    } else {
      createNewNote()
    }
  }

  // Function to handle editing the content of a note
  const handleEditContent = (e) => {
    // update notes edited content
    setSelectedNote((prevState) => ({
      ...prevState,
      editedContent: e.target.value
    }))

    setSaveAvailable(!(e.target.value === selectedNote.content))
  }

  const handleEditTitle = (e) => {
    // update notes edited title
    setSelectedNote((prevState) => ({
      ...prevState,
      editedTitle: e.target.value
    }))

    setSaveAvailable(!(e.target.value === selectedNote.title))
  }

  // Function to store the value of the current selected note in note SV
  const storeSelectedNote = () => {
    setNotes((prevState) => {
      return prevState.map((note) => {
        if (note._id === selectedNote._id) {
          return {
            ...note,
            editedContent: selectedNote.editedContent,
            editedTitle: selectedNote.editedTitle
          };
        }
        return note;
      });
    });
  }

  // Function to select a note on the Navbar
  const handleSelectNote = (ind) => {

    // Store the current note
    storeSelectedNote()

    // Set the selected note
    setSelectedNote(notes[ind])

    // Check to see whether edits have already been made to the current note
    let chosenNote = notes[ind]
    if (chosenNote.editedContent !== chosenNote.content || 
      chosenNote.editedTitle !== chosenNote.title) {
      setSaveAvailable(true)
    } else {
      setSaveAvailable(false)
    }
  };

  const handleCreateNewNote = () => {
    storeSelectedNote()
    createNewNote()
  }

  // Function to display blank editor
  const createNewNote = () => {
    // Set the selected note to a blank note
    setSelectedNote({
      _id: '',
      title: '',
      content: '',
      editedTitle: '',
      editedContent: '',
      date: new Date().toLocaleString('en-US', { 
        timeZone: 'America/New_York', 
        year: '2-digit', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute:'2-digit'})
    })

    // We cannot save a blank new note
    setSaveAvailable(false)
  }

  // Function to save new note
  const saveNote = async () => {
    console.log(selectedNote)

    // check to see if it is a new note
    if (selectedNote._id === ''){
      const response = await createNote(
        user.id, selectedNote.date, selectedNote.editedTitle, selectedNote.editedContent)
      
        response.editedTitle = response.title
        response.editedContent = response.content

        console.log(response)

        setNotes(prevNotes => [...prevNotes, response])
        setSelectedNote(response)
        setSaveAvailable(false)
    } else {
      const response = await updateNote(selectedNote._id, selectedNote.editedContent)

      response.editedTitle = response.title
      response.editedContent = response.content

      setNotes(prevNotes => {
        return prevNotes.map(note => {
          if (note._id === response._id) {
            return response
          }
          return note
        })
      })
      setSelectedNote(response)
      setSaveAvailable(false)
    }
  }

  // Function to delete a note
  const handleDeleteNote = async () => {
    const response = await deleteNote(user.id, selectedNote._id)

    // Remove deleted note from notes SV
    setNotes(prevNotes => prevNotes.filter(note => note._id !== response._id))

    // Set selected note to first note
    createNewNote()
  }

  // Use effect to query for notes
  useEffect(() => {
    handleQueryNotes()
  }, [])

  return (
    <div className='rounded-sm w-full h-[80vh] flex flex-row items-center justify-center'>
        <Navbar 
          notes = {notes}
          selectedNote = {selectedNote}
          handleSelectNote = {handleSelectNote}/>

        <div className='flex flex-col w-full h-full'>
          <EditorToolbar 
            newNote = {selectedNote._id === ''}
            handleCreateNewNote = {handleCreateNewNote}
            saveAvailable = {saveAvailable}
            saveNote = {saveNote}
            handleDeleteNote = {handleDeleteNote}
            handleLogout = {handleLogout} />
          <Editor 
            selectedNote = {selectedNote}
            handleEditTitle = {handleEditTitle}
            handleEditContent = {handleEditContent} />
        </div>
    </div>
  )
}
