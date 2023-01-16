import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import axios from 'axios'
import CategoryEdit from './CategoryEdit'
export default function SingleCategory(props) {
  const [showEdit, setShowEdit] = useState(false)

  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.catName}?`)) {
      axios.delete(`https://localhost:7062/api/Categories/${id}`).then(() => {props.getCategories()})
    } 
  }
  const currentUser = useAuth()
  return (
    <tr>
        <td>{props.category.catName}</td>
        <td>{props.category.catDesc === null || props.category.catDesc === '' ? `There's no description sowwy` : props.category.catDesc}</td>

        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && 
          <td>
            <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button className='m-1 rounded' id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>
              <FaTrashAlt />
            </button>
            {showEdit &&
              <CategoryEdit 
                category={props.category}
                getCategories={props.getCategories}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                />
            }
          </td>
        }
    </tr>
  )
}
