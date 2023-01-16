import React from 'react'
import GroceryForm from './GroceryForm'
export default function GroceryCreate(props) {
  return (
    <article className="createGrocery m-2 text-white justify-content-center">
        <GroceryForm 
            getResources={props.getGroceries} setShowCreate={props.setShowCreate} />
    </article>
  )
}
