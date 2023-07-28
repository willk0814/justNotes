import React from 'react'

import './Home.css'
export default function NoteEditor({ note }) {
  return (
    <div className='editorContainer'>
        {/* Title and Date Container */}
        <div className='editorHeader'>
            <input 
                type='text'
                value={note.title}
                className='titleInput'
                onChange={(e) => console.log(e.target.value)}/>
            <p className='editorDate'>{note.date}</p>
        </div>

        <textarea
            className='mainEditor'
            value={note.content}
            onChange={(e) => console.log(e.target.value)} />
    </div>
  )
}
