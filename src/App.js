import React from 'react'
import './App.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import AuthProvider from './contexts/AuthContext'
import Login from './components/auth/Login'
//import Logout from './components/auth/Logout'
import { useAuth } from './contexts/AuthContext'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Categories from './components/categories/Categories'
import Groceries from './components/groceries/Groceries'

export default function App() {
  
  return (
    <div className='app'>
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<ProtectedRoute><Groceries /></ProtectedRoute>} />
            <Route path='/Login' element={<Login />} />      
            <Route path='/Categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/Groceries' element={<ProtectedRoute><Groceries /></ProtectedRoute>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}
