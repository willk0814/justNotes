import React from 'react'

export default function NavbarElement({ ind, note, selected, handleSelectNote }) {
  return (
    <div 
      className={`border-2 border-[#e9c46a] rounded-lg p-1 my-3 cursor-pointer text-[#e9c46a] 
      ${selected ? 'bg-[#e9c46a]' : ''}`}
      onClick={() => handleSelectNote(ind)}>
      <h2 className={`font-xl ${selected ? 'text-[#264653]' : ''}`}>{note.title}</h2>
      
      <h2 className={`font-xl text-nowrap ${selected ? 'text-[#264653]' : ''}`}>
          {new Date(note.date).toLocaleString('en-US', { 
              timeZone: 'America/New_York', 
              year: '2-digit', 
              month: '2-digit', 
              day: '2-digit',
              hour: 'numeric',
              minute: 'numeric'
          })}
      </h2>
    </div>
  )
}
