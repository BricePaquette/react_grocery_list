import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    catName: Yup.string().max(25, '*Max 25 characters').required('*Required'),
    catDesc: Yup.string().max(100, '*Max 100 characters')
})

const grocerySchema = Yup.object().shape({
    name: Yup.string().max(100, '*Max 100 characters').required('*Required'),
    done: Yup.bool().required('*Required'),
    categoryId: Yup.number().required('*Required')
})


export { grocerySchema }
export default { catSchema }
