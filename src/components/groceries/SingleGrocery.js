import axios from 'axios'
import React, {useState} from 'react'
import './Groceries.css'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'

export default function SingleGrocery(props) {
      const [showEdit, setShowEdit] = useState(false)
      const currentUser = useAuth()
  
    const handleDone = () => {
      const groceryToFlip = {
        toDoId: props.grocery.toDoId,
        name: props.grocery.name,
        done: !props.grocery.done,
        categoryId: props.grocery.categoryId
      }
      axios.put(`https://localhost:7062/api/ToDos/${props.grocery.toDoId}`, groceryToFlip).then(response => {
        console.log(response)
        props.getGroceries()
      })


  }
  const deleteGrocery = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.grocery.name}?`)) {
      axios.delete(`https://localhost:7062/api/ToDos/${id}`).then(() => {props.getGroceries()})
    } 
  }
  //push done to flip
  //create a button to cleanup all done groceries
    return (
      <tr>
          <td>{props.grocery.name}</td>
          <td><input type='checkbox' checked={props.grocery.done} onChange={() => handleDone()}/></td>
          <td>{props.grocery.category.catName}</td>
          {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && 
          <td>
            <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button className='m-1 rounded' id='deleteLink' onClick={() => deleteGrocery(props.grocery.toDoId)}>
              <FaTrashAlt />
            </button>
            {/* {showEdit &&
              <CategoryEdit 
                category={props.category}
                getCategories={props.getCategories}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                />
            } */}
          </td>
        }
      </tr>
    )
  }
