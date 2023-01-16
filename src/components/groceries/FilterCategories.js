import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FilterCategories(props) {

    //We need to access and store categories from the API for this component to work
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`https://localhost:7062/api/Categories`).then(response => {//.then is used so this function doesnt run at the same time
        console.log(response)
        setCategories(response.data)
    })
    }, [])

  return (
    <div className='text-center mt-5'>
        <button onClick={() => props.setFilter(0)} className='groceryButton'>All</button>
        {/* Below we map all categories to a button that will be used to filter resources on that category */}
        {categories.map(foo => 
            <button key={foo.catName} className='groceryButton' onClick={() => props.setFilter(Number(foo.categoryId))}>
                {foo.catName}
            </button>    
        )}
        
    </div>
  )
}
