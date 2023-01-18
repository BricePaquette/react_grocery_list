import React, {useState, useEffect} from 'react'
import {Formik, Field, Form} from 'formik'
import { grocerySchema } from '../../utilities/ValidationSchema'
import axios from 'axios'
export default function GroceryForm(props) {
    const [categories, setCategories] = useState([])
    
    const getCategories = () => {
        axios.get(`https://localhost:7062/api/Categories`).then(response => setCategories(response.data))
    }
    const handleSubmit = (values) => {
        console.log(values)
        if(!props.resource){
            const groceryToCreate = values
            axios.post(`https://localhost:7062/api/ToDos`, groceryToCreate).then(() => {
                props.getGroceries()//called to update the resources and display the newest one
                props.setShowCreate(false)//called to close the form
            })
        }
        else{
            //everything in this scope will be edit logic since there is a props.resource
            const groceryToEdit = {
                    resourceId: props.grocery.resourceId,
                    name: values.name,
                    done: values.done,
                    categoryId: values.categoryId
                }
                axios.put(`https://localhost:7062/api/ToDos/${props.grocery.toDoId}`, groceryToEdit).then(() => {
                    props.getGroceries()
                    props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);
  return (
    <Formik
    initialValues={{
        name: props.grocery ? props.grocery.name : '',
        done: props.grocery ? props.grocery.done : '',
        categoryId: props.grocery ? props.grocery.categoryId : '' 
    }}
    validationSchema={grocerySchema}
    onSubmit={(values) => handleSubmit(values)}>
    {({errors, touched}) => (
        <Form id='groceryForm'>
            <div className="form-group m-3">
                <Field name='name' className='form-control' placeholder='Name' />
                {errors.name && touched.name ?
                    <div className='text-danger'>{errors.name}</div>
                : null }
            </div>
            
            <div className="form-group m-3">
                <span className='mx-2'>Got?</span>
                <Field type='checkbox' name='done' />
                
                {errors.done && touched.done ?
                    <div className='text-danger'>{errors.done}</div>
                : null }
            </div>
            <div className="form-group m-3">
                <Field name='categoryId' as='select' className='form-control'>
                   
                    <option value='' disabled>[--Please Choose--]</option>
                    {
                        categories.map(x => 
                            <option key={x.categoryId} value={x.categoryId}>
                                {x.catName}
                            </option>
                    )}
                </Field>
                
            </div>
            <div className="form-group m-3">
                <button type='submit' className='groceryButton'>Submit</button> 
            </div>
        </Form>
    )}
</Formik>
  )
}
