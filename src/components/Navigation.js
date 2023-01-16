import React from 'react'

import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Logout from './auth/Logout'
import './Navigation.css'
export default function Navigation() {
  const { currentUser } = useAuth()
  return (
    <Navbar className='p-3 navigation' expand='md'>
        <Navbar.Brand href='/'>Grocery List</Navbar.Brand>
        
        <Navbar.Toggle /> {/* Hamburger Button */}
        <Navbar.Collapse className='justify-content-end'>
            
            <Nav>
                {!currentUser &&
                  <Link to='/Login' className='nav-link'>Login</Link>
                }
                {currentUser &&
                  <Logout />
                }
                <Link to='/Categories' className='nav-link'>Categories</Link>
                <Link to='/Groceries' className='nav-link'>Groceries</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

