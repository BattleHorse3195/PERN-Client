import { Product } from "../types"
import { formatCurrency } from '../../src/utils/index'
import { ActionFunctionArgs, Form, Link, redirect, useFetcher } from "react-router-dom"
import { deleteProduct } from "../services/ProductService"

export const action = async ({ params }: ActionFunctionArgs) => {
    console.log(params.id)
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        // console.log('Product Deleted')
        return redirect('/')
    }


}

type ProductDetailsPromps = {
    product: Product
}
export default function ProductDetails({ product }: ProductDetailsPromps) {
    const fetch = useFetcher()
    const { id, name, price, availability } = product
    return (
        <>
            <tr className="border-b text-center">
                <td className="p-3 text-lg text-gray-800">
                    {name}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {formatCurrency(price)}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {/* Apply useFetch to interact and stay in the same page */}
                    <fetch.Form
                        method="POST"
                        className="w-full"
                    >
                        <button
                            type="submit"
                            name="id"
                            value={id}
                            className={`${availability ? ' text-blue-600 border  w-full p-1 rounded' : ' text-black border  w-full p-1 rounded'}`}
                        >
                            {availability ? 'Availability' : 'Unavailability'}
                        </button>

                    </fetch.Form>

                </td>
                <td className="p-3 text-lg text-gray-800">
                    <div className="  flex gap-2 items-center ">
                        <Link
                            className="p-1 text-center text-white bg-orange-500 rounded w-full hover:bg-orange-700"
                            to={`products/${id}/edit`}
                        >
                            Edit
                        </Link>
                        <Form
                            className="w-full"
                            method="POST"
                            action={`products/${id}/delete`}
                            onSubmit={(e) => {
                                if (!confirm('Are you sure you want to delete this product?')) {
                                    e.preventDefault()
                                }
                            }
                            }


                        >
                            <input
                                className=" p-1 text-center text-white bg-blue-500 rounded hover:bg-blue-700 w-full"
                                type="submit"
                                value='Delete'

                            />



                        </Form>
                    </div>
                </td>
            </tr>

        </>
    )
}
