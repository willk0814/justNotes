import React, { useState } from 'react'

import './Home.css'
export default function NoteEditor({ note, 
  handleTitleChange, 
  handleContentChange }) {

  return (
    <div className='editorContainer'>
        {/* Title and Date Container */}
        <div className='editorHeader'>
            <input 
                type='text'
                value={note.title}
                className='titleInput'
                onChange={(e) => handleTitleChange(e)}/>
            <p className='editorDate'>{note.date}</p>
        </div>

        <textarea
            className='mainEditor'
            value={note.content}
            onChange={(e) => handleContentChange(e)} />
    </div>
  )
}
