import React from 'react'


export default function Register() {
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

        <button className='submitButton'>Register</button>

    </div>
  )
}
