import React from 'react'

// Import Individual Navbar Widget
import NavbarElement from './NavbarElement'

export default function Navbar({ notes, selectedNote, handleSelectNote }) {

  return (
    <div>
        {notes.map((note, ind) => (
            <NavbarElement 
                key = {ind}
                ind = {ind}
                note = {note}
                selected = {note._id === selectedNote._id}
                handleSelectNote = {handleSelectNote} />
        ))}
    </div>
  )
}
