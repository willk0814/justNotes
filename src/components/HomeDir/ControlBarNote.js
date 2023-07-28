import React from 'react';

import './Home.css'

export default function ControlBarNote({ title, date, note_id, selected_id }) {
  return (
    <div className={note_id === selected_id ? 'userNote userNote_selected' : 'userNote'}>
      <p className='noteSelectText'>{title}</p>
      <p className='noteSelectText'>{new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York', 
      year: '2-digit', 
      month: '2-digit', 
      day: '2-digit'})}</p>
    </div>
  );
}
