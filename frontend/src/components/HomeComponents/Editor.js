import React, { useEffect, useState } from 'react'


export default function Editor({ selectedNote, handleEditTitle, handleEditContent}) {

  return (
    <div className='flex w-full flex-col h-full items-center rounded-lg'>

        <div className='h-[75%] w-[100%] pl-2'>
            <div className='flex flex-wrap justify-between w-[100%] pb-2'>
                <input
                    className='text-xl font-semibold border-2 border-[#e9c46a] rounded-lg w-150 h-10 px-2 bg-[#264653] text-[#e9c46a]'
                    value={selectedNote.editedTitle}
                    onChange={(e) => handleEditTitle(e)} />
                <div className='text-[#e9c46a] text-xl'>
                    <h2>
                        {new Date(selectedNote.date).toLocaleString('en-US', { 
                            timeZone: 'America/New_York', 
                            year: '2-digit', 
                            month: '2-digit', 
                            day: '2-digit',
                            hour: '2-digit',
                            minute:'2-digit'})}
                    </h2>
                </div>
            </div>

            <textarea 
                className='rounded-lg border-2 border-[#e9c46a] bg-[#264653] w-[100%] h-full resize-none text-[#e9c46a] p-2' 
                value={selectedNote.editedContent}
                onChange={(e) => handleEditContent(e)}/>

        </div>

        
    </div>
  )
}
