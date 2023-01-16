import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import './Categories.css'
import SingleCategory from './SingleCategory';
import { useAuth } from '../../contexts/AuthContext';
import CategoryCreate from './CategoryCreate'
export default function Categories() {

    const currentUser = useAuth()
    //Steps to Read functionality w
    //1. add useState and useEffect to the react import w
    //2. install and import axios w
    //3. create the hook to store the data
    const [categories, setCategories] = useState([])
    const [showCreate, setShowCreate] = useState(false)
    //4. create the function that uses axios to get the categories
    const getCategories = () => {
        axios.get('https://localhost:7062/api/Categories').then(c => {
            //console.log(categories)
            setCategories(c.data)//populating the collection with data
        })
    }
    //5. create useEffect to automate retrieval of data in this component
    useEffect(() => {
        console.log(categories)
        getCategories()
    }, [])
    //----- You should now have your data stored, and now on to the UI
    //6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)

  return (
    <section className="categories">
            <article className="categoriesHeading text-center">
                <br />
                <Container className='bgPurple categoriesBody'>
                    {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                        <div className="p-2 mb-3 text-center">
                        {showCreate ?           
                        <>
                            <button onClick={() => setShowCreate(false)} className='createButton'>Cancel</button>
                            <CategoryCreate getCategories={getCategories} setShowCreate={setShowCreate}/>
                        </>
                    : <button className='createButton' onClick={() => setShowCreate(true)}>Create Category</button>
                    }
            </div>
        }
                    <table className='table text-white'>
                        <thead className='text-uppercase'>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                                    <th>Actions</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(c => 
                                <SingleCategory key={c.categoryId} category={c} getCategories={getCategories} />
                                )}
                        </tbody>
                    </table>
                </Container>
            </article>
    </section>
  )
}
