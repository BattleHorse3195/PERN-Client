import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateAvailability } from '../services/ProductService'
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

export const loader = async () => {
  const data = await getProducts()
  return data
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData())
  await updateAvailability(+data.id)
  console.log(data)
  return {}
}

export default function Products() {

  const products = useLoaderData() as Product[]
  // console.log(products)

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black text-slate-500 py-3">
          Products
        </h2>
        <Link
          to='new/product'
          className="rounded-md bg-blue-500 font-bold items-center text-white p-3 text-sm hover:bg-indigo-900"
        >
          Add Product
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              return (
                <ProductDetails
                  key={product.id}
                  product={product}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
