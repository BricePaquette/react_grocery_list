import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import './Groceries.css'
import SingleGrocery from './SingleGrocery'
import FilterCategories from './FilterCategories'
import { useAuth } from '../../contexts/AuthContext'
import GroceryCreate from './GroceryCreate'
export default function Groceries() {
    //Steps to Read functionality
    //1. add useState and useEffect to the react import w
    //2. install and import axios w
    //3. create the hook to store the data w
    //4. create the function that uses axios to get the categories w
    //5. create useEffect to automate retrieval of data in this component w
    //----- You should now have your data stored, and now on to the UI
    //6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)
    const [groceries, setGroceries] = useState([])
    const [showCreate, setShowCreate] = useState(false)
    const getGroceries = () => {
        axios.get('https://localhost:7062/api/ToDos').then(g => {
            console.log(g)
            setGroceries(g.data)
        })
    }
    const currentUser = useAuth()
    useEffect(() => {
        getGroceries()
    }, []);

    
    //Filtering steps - use .filter() to create a limited list of resources.
    //1. Create a hook that will store values for what the user wants to filter resources by...this hook will store the categoryId for the category they want to filter by.
    //2. place the conditional rendering for when filter === 0 in the initial map of resources
    //3. Create FilterCat to give the buttons to the user to filter by
    //4. Render in resources...see below
    //5. Create the conditional rendering for when filter != 0...see below
    const [filter, setFilter] = useState(0)
    

  return (
    <section className="groceries">
            <article className="groceriesHeading text-center">
                <br />
                    <FilterCategories setFilter={setFilter} />
                    
                <Container className='bgPurple groceriesBody'>
                {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                    <div className="bgPurple">
                        <button className='groceryButton' onClick={() => setShowCreate(!showCreate)}>
                            {!showCreate ? 'Add New Grocery' : 'Close Form'}
                        </button>
                        <div className="createContainer">
                            {showCreate &&
                                //Conditionally render the form when show create is true
                                <GroceryCreate getGroceries={getGroceries} setShowCreate={setShowCreate} />
                            }
                        </div>
                    </div>
                }
                    {filter !== 0 && groceries.filter(x => x.categoryId === filter).length === 0 &&
                        <h2 className='alert alert-warning text-dark'>There are no results for this category :(</h2>
                    }
                    <table className='table text-white'>
                        <thead className='text-uppercase'>
                            <tr>
                                <th>Name</th>
                                <th>Got?</th>
                                <th>Category</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filter === 0 ? groceries.map(g =>
                                    <SingleGrocery key={g.toDoId} getGroceries={getGroceries} grocery={g} />
                                )
                                :
                                groceries.filter(foo => foo.categoryId === filter).map( foo =>
                                    <SingleGrocery key={foo.toDoId} getGroceries={getGroceries} grocery={foo} />
                                )
                            }                           
                        </tbody>
                    </table>
                </Container>
            </article>
    </section>
  )
}
