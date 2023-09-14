import React from 'react';

import './Home.css'

export default function ControlBarNote({ title, date, selected_id, index, selectNote }) {
  return (
    <div 
      className={index === selected_id ? 'userNote userNote_selected' : 'userNote'}
      onClick={() => selectNote(index)}>
      <p 
        className={index === selected_id ? 'noteSelectText_selected' : 'noteSelectText'}>
          {title}
      </p>
      <p 
        className={index === selected_id ? 'noteSelectText_selected' : 'noteSelectText'}>
          {new Date().toLocaleString('en-US', { 
            timeZone: 'America/New_York', 
            year: '2-digit', 
            month: '2-digit', 
            day: '2-digit'})}</p>
    </div>
  );
}
