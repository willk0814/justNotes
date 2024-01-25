import React, { useState } from 'react'

export default function Login({ handleLogin, showRegister }) {

    // SV to manage state of username and password inputs
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

  return (
    <div className='flex flex-col items-start p-4'>
        <h1 className='text-[#e9c46a] text-3xl font-semibold'>Welcome,</h1>
        
        <div className='flex flex-row w-full justify-between items-center py-3'>
            <h2 className='text-[#e9c46a] text-xl'>Username: </h2>
            <input
                type='text'
                className='rounded-md bg-[#93A3A9] ml-4'
                onChange={(e) => setUser(e.target.value)} />
        </div>

        <div className='flex flex-row w-full justify-between items-center py-3'>
            <h2 className='text-[#e9c46a] text-xl'>Password: </h2>
            <input
                type='text'
                className='rounded-md bg-[#93A3A9] ml-4' 
                onChange={(e) => setPass(e.target.value)}/>
        </div>
    

        <button 
            className='rounded-lg border-[#e9c46a] border-2 bg-[#264653] px-2 py-1 mt-2 self-center text-2xl text-[#e9c46a] hover:scale-[1.2] hover:bg-[#e9c46a] hover:text-[#264653] transition-all duration-250'
            onClick={() => handleLogin(user, pass)}>
            Login
        </button>

        <div className='flex flex-row py-4'>
            <p className='text-[#e9c46a] pr-1'>Don't have an account? Register</p>
            <p 
                className='text-[#e9c46a] font-semibold italic underline cursor-pointer'
                onClick={showRegister}>here</p>
        </div>
    </div>
  )
}
