import React, { useState } from 'react'

import { FiSave, FiTrash2, FiPenTool } from 'react-icons/fi'
import { FaSignOutAlt } from 'react-icons/fa'
import { BsPen, BsPenFill } from 'react-icons/bs'
import ControlBarNote from './ControlBarNote';

export default function ControlBar({ 
  notes, 
  selected_ind, 
  handleSave, 
  selectNote, 
  handleDeleteNote,
  editsMade }) {

  const notesArray = Object.keys(notes).map((noteKey) => notes[noteKey]);

  return (
    <div className='controlBarContainer'>
      {/* Usable notes container */}
      <div className='userNotesContainer'>
      {notes.map((note, index) => (
          <ControlBarNote 
            key={index} 
            title={note.title} 
            date={note.date} 
            selected_id={selected_ind}
            index={index}
            selectNote={selectNote} />
        ))}
        <div className='newNoteIconContainer'>
          {/* <BsPenFill
            color='#e9c46a'
            size={35} /> */}
        </div>
      </div>

      {/* controls container */}
      <div className='controlsContainer'>
        <FiPenTool
          size={35}
          className={selected_ind == 'new_note' ? 'controlButton_disabled' : 'controlButton'}
          onClick={selected_ind == 'new_note' ? () => {} : () => selectNote('new_note')} />
        <FiSave
          size={35} 
          className={editsMade ? 'controlButton' : 'controlButton_disabled'} 
          onClick={editsMade ? () => handleSave() : () => {}}/>
        <FiTrash2 
          size={35} 
          className='controlButton'
          onClick={handleDeleteNote}/>
        <FaSignOutAlt 
          size={35} 
          className='controlButton'/>
      </div>

    </div>
  )
}
