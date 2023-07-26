import React, { useState } from 'react'

import Register from '../FormDir/Register'
import Login from '../FormDir/Login'
import Home from '../HomeDir/Home'

import './Body.css'

export default function Page() {

  const [loggedIn, setLoggedIn] = useState(true)
  const [showRegistration, setShowRegistration] = useState(true)

  return (
    <div className='PageContainer'>
      <h1 className='titleText'>Just Notes</h1>

      {!loggedIn && !showRegistration && <Login />}
      {!loggedIn && showRegistration && <Register />}
      {loggedIn && <Home />}


    </div>
  )
}
