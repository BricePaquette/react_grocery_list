import React from 'react'
import CategoryForm from './CategoryForm'

export default function CatCreate(props) {
  return (
    <div className='m-2 text-center'>
        <CategoryForm getCategories={props.getCategories} setShowCreate={props.setShowCreate}/>
    </div>
  )
}