import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { editProduct, getProductById } from '../services/ProductService'
import { Product } from '../types'
import ProductForm from '../components/ProductForm'

export const loader = async ({ params }: LoaderFunctionArgs) => {
    // console.log(params)
    if (params.id !== undefined) {
        const product = await getProductById(+params.id)
        if (!product) {
            // throw new Response('',{status: 404, statusText:'Not Found'})
            return redirect('/')
        }
        return product
    }
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
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
    if (params.id !== undefined) {
        await editProduct(data, +params.id)
        return redirect('/')
    }


    // return redirect('/')
}

const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]



export default function EditProduct() {
    const error = useActionData() as string
    const { name, price, availability } = useLoaderData() as Product
    // console.log(state)

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-slate-500 py-3">
                    Editing Product
                </h2>
                <Link
                    to='/'
                    className="rounded-md bg-blue-500 font-bold items-center text-white p-3 text-sm hover:bg-indigo-900"
                >
                    Go back to Products
                </Link>

            </div >

            {error && <ErrorMessage children={error} />}

            <Form
                className="mt-10"
                method='POST'
            >

                <ProductForm
                    name={name}
                    price={price}
                />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                
                <input
                    type="submit"
                    className="mt-5 w-full bg-blue-500 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-900"
                    value="Edit Product"
                />
            </Form>
        </>
    )
}
