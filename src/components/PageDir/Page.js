import React, { useState } from 'react'

// Import child components for different screens
import Register from '../FormDir/Register'
import Login from '../FormDir/Login'
import Home from '../HomeDir/Home'

// Import authentication functions
import { login, register } from '../../services/authenticationServices'

// Import stylesheets
import './Body.css'

export default function Page() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)

  const [currUser, setCurrUser] = useState({})
  const [notes, setNotes] = useState([])

  const handleRegister = async (username, password) => {
    const response = await register(username, password)
    setCurrUser(response.user)
    setNotes(response.user.notes)
    setLoggedIn(true)
  }

  const handleLogin = async (username, password) => {
    const response = await login(username, password)
    setCurrUser(response)
    setNotes(response.userData.notes)
    setLoggedIn(true)
  }

  return (
    <div className='PageContainer'>
      <h1 className='titleText'>Just Notes</h1>

      {!loggedIn && !showRegistration && <Login handleLogin={handleLogin}/>}
      {!loggedIn && showRegistration && <Register handleRegister={handleRegister}/>}
      {loggedIn && <Home user = {currUser} />}


    </div>
  )
}
