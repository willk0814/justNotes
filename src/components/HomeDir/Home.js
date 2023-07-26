import React from 'react'

import ControlBar from './ControlBar'
import NoteEditor from './NoteEditor'

import './Home.css'

export default function Home() {

  const date = new Date();
  const options = {
    timeZone: 'America/New_York',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };
  const formattedDate = date.toLocaleString('en-US', options);
  const notes = {
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
    <div className='homeContainer'>
      <ControlBar notes={notesArray}/>
      <NoteEditor 
        note={notes.note_1}/>
    </div>
  )
}
