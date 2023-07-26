import React from 'react'

import './FormShared.css'

export default function Login() {
  return (
    <div className='formContainer'>
        <div className='inputContainer'> 
            <label className='inputLabel'>Username: </label>
            <input className='input' type='text' />
        </div>

        <div className='inputContainer'> 
            <label className='inputLabel'>Password: </label>
            <input className='input' type='text' />
        </div>

        <button className='submitButton'>Login</button>
    </div>
  )
}
