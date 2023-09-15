import React, { useState } from 'react'

import './Home.css'
export default function NoteEditor({ note, handleTitleChange, handleContentChange }) {
  console.log('From editor ', note)
  
  return (
    <div className='editorContainer'>
        {/* Title and Date Container */}
        <div className='editorHeader'>
            <input 
                type='text'
                value={note.title}
                className='titleInput'
                onChange={(e) => handleTitleChange(e)}/>
            <p 
              className='editorDate'>
              {new Date(note.date).toLocaleString('en-US', { 
            timeZone: 'America/New_York', 
            year: '2-digit', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute:'2-digit'})}
            </p>
        </div>

        <textarea
            className='mainEditor'
            value={note.editedContent}
            onChange={(e) => handleContentChange(e)} />
    </div>
  )
}
