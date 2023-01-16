import React from 'react'
//Below we import useAuth from our AuthContext in order to access the Login() function

//useAuth() is the function we want to import any time we need currentUser, Login(), Logout()
import { useAuth } from '../../contexts/AuthContext' //we need this import statement everytime we want to login logout or get user info
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import './Login.css'
export default function Login() {

    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleAuth(){
        //Await keyword will pause anymore code from executing until we get a response back from firebase
        await login()//the next line wont execute until login() has been executed

        //return the user to a specific location using useNavigatefrom react-router-dom
        return navigate('/')
    }

  return (
    <div className='login'>
        <article className="mb-5 p-5">
            <Container>
            <div className='bgPurple text-center text-white loginBody'>
                <h2>Feel Free to sign in with Github below for full functionality</h2>
                <p className=''>
                    I built this little app so I don't have to use notpad or physical notes when going to the store. <br />
                    
                </p>
                <button className="loginButton" onClick={() => handleAuth()}>Login w/ Github</button>
            </div>
            </Container>
        </article>
    </div>
  )
}
