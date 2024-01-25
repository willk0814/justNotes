import React, { useState } from 'react'

// Login & Registration Components
import Login from './AuthComponents/Login'
import Register from './AuthComponents/Register'

// Home Page Component 
import Home from './HomeComponents/Home'

// Register, Login, and Logout functions
import { register, login } from '../services/authenticationServices'

export default function Page() {


    // SV to managed loggedIn state
    const [showLogin, setShowLogin] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

    // SV manage user state
    const [user, setUser] = useState({
        id: '',
        userName: ''
    })

    // Function to toggle Login/Register
    const toggleLoginRegister = () => {
        setShowLogin(!showLogin)
    }

    // Function to handle register
    const handleRegister = async (email, username, password) => {
        const response = await register(email, username, password)
        const {user: user, _id: id} = response
        setUser({id: id, userName: user})
        setLoggedIn(true)
    }
    
    // Function to handle login
    const handleLogin = async (username, password) => {
        const response = await login(username, password)
        const {user: user, _id: id} = response
        setUser({id: id, userName: user})
        setLoggedIn(true)
    }

    // Function to handle logout
    const handleLogout = () => {
        setLoggedIn(false)
        setUser({id: '', userName: ''})
    }

  return (
    <div className='flex flex-col items-center w-[100vw] h-[100vh] bg-[#264653]'>
        
        <h1 className='text-[#e9c46a] text-4xl font-bold pt-8'>Just Notes</h1>
        <p className='text-[#e9c46a] italic pb-8'>A place just for notes</p>

        <div className='flex flex-col items-center justify-center w-[80%] rounded-lg'>
            {loggedIn ? 
            ( <Home 
                user = {user} 
                handleLogout = {handleLogout} /> ) : (
                <div className='flex border-2 border-[#e9c46a] rounded-lg'>
                    {showLogin ? 
                        ( <Login 
                            handleLogin = {handleLogin}
                            showRegister = {toggleLoginRegister} /> ) : 
                        ( <Register
                            handleRegister = {handleRegister}
                            showLogin = {toggleLoginRegister} /> )}
                </div>)}
        </div>
    </div>
  )
}
