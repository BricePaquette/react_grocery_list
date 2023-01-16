import React from 'react'
import { Modal } from 'react-bootstrap'
import CategoryForm from './CategoryForm'
export default function CategoryEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.showEdit(false)}
        size='lg'>
            <Modal.Header>
                <h2>Edit {props.category.catName}?</h2>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm 
                    getCategories={props.getCategories}
                    setShowEdit={props.setShowEdit}
                    category={props.category} />
            </Modal.Body>

    </Modal>
  )
}
