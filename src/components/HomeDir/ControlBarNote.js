import React from 'react'

export default function ControlBarNote({ title, date, note_id }) {
  return (
    <div className='userNote'>
        <p className='noteSelectText'>{title}</p>
        <p className='noteSelectText'>{date}</p>
    </div>
  )
}
