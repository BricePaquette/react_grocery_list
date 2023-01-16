import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Logout from './auth/Logout'
//Logout will be conditionally rendered if the currentUser is logged in so we need currentUser

export default function Footer() {
    const { currentUser } = useAuth()
  return (
    <>
        
        <footer className="text-center text-white bgPurple p-4">
            
            <strong>&copy; {new Date().getFullYear()} All Rights Reserved</strong>
        </footer>
    </>
  )
}