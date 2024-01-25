import React, { useEffect, useState } from 'react'

// Import React Icons for toolbar
import { FiSave, FiTrash2, FiPenTool } from 'react-icons/fi'
import { FaSignOutAlt } from 'react-icons/fa'

export default function EditorToolbar({ 
    newNote, handleCreateNewNote, 
    saveAvailable, saveNote, 
    handleDeleteNote,
    handleLogout }) {

    
  return (
    <div className='flex justify-end w-full py-4'>
        <FiPenTool
            size={45}
            color={newNote ? '#c0c0c0' : '#e9c46a' }
            className={`${newNote ? '' : 'cursor-pointer'} mr-4`}
            onClick={handleCreateNewNote}/>
        <FiSave
            size={45}
            color={saveAvailable ? '#e9c46a' : '#c0c0c0' }
            className={`${saveAvailable ? 'cursor-pointer' : ''} mr-4`}
            onClick={saveAvailable ? saveNote : null}/>
        <FiTrash2 
            size={45}
            color={newNote ? '#c0c0c0' : '#e9c46a' }
            className={`${newNote ? '' : 'cursor-pointer'} mr-4`}
            onClick={handleDeleteNote}/>
        <FaSignOutAlt 
            size={45}
            color='#e9c46a' 
            className='cursor-pointer'
            onClick={handleLogout}/>
    </div>
  )
}
