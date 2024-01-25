import React, { useState } from 'react'

export default function Register({ handleRegister, showLogin }) {

    // SV to manage state of email, user, pass, and confirm pass inputs
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    // Function to handle register click
    const handleRegisterClick = () => {
        // Check to ensure that the password matches the confirm password
        if (confirmPass === pass) {
            handleRegister(email, user, pass)
        } else {
            console.log('Password does not match confirm password')
        }
    }

  return (
    <div className='flex flex-col items-start p-4'>
        <h1 className='text-[#e9c46a] text-3xl font-semibold'>Welcome,</h1>
        
        <div className='flex flex-row w-full justify-between items-center py-3'>
            <h2 className='text-[#e9c46a] text-xl'>Email: </h2>
            <input
                type='email'
                className='rounded-md bg-[#93A3A9] ml-4'
                onChange={(e) => setEmail(e.target.value)} />
        </div>

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
                onChange={(e) => setPass(e.target.value)} />
        </div>

        <div className='flex flex-row w-full justify-between items-center py-3'>
            <h2 className='text-[#e9c46a] text-xl'>Re-Enter Pass: </h2>
            <input
                type='text'
                className='rounded-md bg-[#93A3A9] ml-4'
                onChange={(e) => setConfirmPass(e.target.value)} />
        </div>

        <button 
            className='rounded-lg border-[#e9c46a] border-2 bg-[#264653] px-2 py-1 mt-2 self-center text-2xl text-[#e9c46a] hover:scale-[1.1] hover:bg-[#e9c46a] hover:text-[#264653] transition-all duration-250'
            onClick={handleRegisterClick}>
            Register
        </button>

        <div className='flex flex-row py-4'>
            <p className='text-[#e9c46a] pr-1'>Already have an account? Login</p>
            <p
                className='text-[#e9c46a] font-semibold italic underline cursor-pointer'
                onClick={showLogin}>here</p>
        </div>
    </div>
  )
}
