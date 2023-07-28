import React, { useState } from 'react'

import { FiSave } from 'react-icons/fi'
import { FaSignOutAlt } from 'react-icons/fa'
import ControlBarNote from './ControlBarNote';

export default function ControlBar({ notes, handleSave }) {

  const date = new Date();
  const options = {
    timeZone: 'America/New_York',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };
  const formattedDate = date.toLocaleString('en-US', options);
  const tmpNotes = {
      note_1: {
        title: 'Test 1',
        date: formattedDate,
        content: "Test 1 content"
      },
      note_2: {
        title: 'Test 2',
        date: formattedDate,
        content: "Test 2 content"
      },
      note_3: {
        title: 'Test 3',
        date: formattedDate,
        content: "Test 3 content"
      },
  }
  const notesArray = Object.keys(notes).map((noteKey) => notes[noteKey]);

  return (
    <div className='controlBarContainer'>
      {/* Usable notes container */}
      <div className='userNotesContainer'>
      {notesArray.map((note, index) => (
          <ControlBarNote key={index} title={note.title} date={note.date} note_id={index} selected_id={1} />
        ))}
      </div>

      {/* controls container */}
      <div className='controlsContainer'>
        {/* Update Button or save button */}
        <FiSave color='#e9c46a' size={35} className='controlButton' onClick={handleSave}/>
        <FaSignOutAlt color='#e9c46a' size={35} className='controlButton'/>
      </div>

    </div>
  )
}
