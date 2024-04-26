import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { addProducts } from '../services/ProductService'
import ProductForm from '../components/ProductForm'

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData())
  // console.log(data)
  let error = ''
  if (Object.values(data).includes('')) {
    error = 'All the Field are necessary'

  }
  if (error.length) {
    return error
  }
  // console.log(error)
  await addProducts(data)

  return redirect('/')
}



export default function NewProduct() {
  const error = useActionData() as string
  console.log(error)

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black text-slate-500 py-3">
          Registering Product
        </h2>
        <Link
          to='/'
          className="rounded-md bg-blue-500 font-bold items-center text-white p-3 text-sm hover:bg-indigo-900"
        >
          Go back to Products
        </Link>

      </div >

      {error && <ErrorMessage children = {error} />}

      <Form
        className="mt-10"
        method='POST'
      >

        <ProductForm/>
        
        <input
          type="submit"
          className="mt-5 w-full bg-blue-500 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-900"
          value="Register Product"
        />
      </Form>
    </>
  )
}
