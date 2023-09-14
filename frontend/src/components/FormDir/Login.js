import React, {useState} from 'react'

// Import stylesheet
import './FormShared.css'

export default function Login({ handleLogin }) {

  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  return (
    <div className='formContainer'>
        <div className='inputContainer'> 
            <label 
              className='inputLabel'>Username: </label>
            <input 
              className='input'
              type='text'
              value={user}
              onChange={(e) => setUser(e.target.value)} />
        </div>

        <div className='inputContainer'> 
            <label className='inputLabel'>Password: </label>
            <input 
              className='input' 
              type='text'
              value={pass}
              onChange={(e) => setPass(e.target.value)} />
        </div>

        <button 
          className='submitButton'
          onClick={() => handleLogin(user, pass)}>Login</button>
    </div>
  )
}
