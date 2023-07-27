import React from 'react';

import './Home.css'

export default function ControlBarNote({ title, date, note_id, selected_id }) {
  return (
    <div className={note_id === selected_id ? 'userNote userNote_selected' : 'userNote'}>
      <p className='noteSelectText'>{title}</p>
      <p className='noteSelectText'>{date}</p>
    </div>
  );
}
