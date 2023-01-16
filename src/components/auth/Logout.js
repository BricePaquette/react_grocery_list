import React from 'react'
import { useAuth } from '../../contexts/AuthContext' //we need this import statement everytime we want to login logout or get user info
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'
import './Logout.css'
export default function Logout() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleAuth() {
        logout()
        navigate('/')
    }
  return (
    
         
        <a className="nav-link" onClick={() => handleAuth()} id='logout'> <Profile /> Logout</a>
    
  )
}
