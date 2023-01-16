import React, { useEffect, useState, useContext, Children } from 'react' //give access to manipulate stateful data
import { auth } from '../base' //gives us access to the auth object which initializes authentication (who are you?)

import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'//Allows us to have a modal popup
import { async } from '@firebase/util'

const AuthContext = React.createContext()


export function useAuth(){
    return useContext(AuthContext)
}


export default function AuthProvider({children}){
    
    
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

 
    const githubAuthProvider = new GithubAuthProvider()
    async function login(){
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)
            
        }))
    }

    //Logout functionality
    async function logout(){
        signOut(auth).then(setCurrentUser(null))
    }
    
    
    const value = {currentUser, login, logout}

    useEffect(() => {
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return authChange
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {/* Below we are waiting for the AuthContext info to populate beore loading the child components in the ui */}
            {!loading && children}

        </AuthContext.Provider>
    )
}