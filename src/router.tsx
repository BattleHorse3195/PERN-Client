import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Products from "./views/Products";
import NewProduct from "./views/NewProduct";
import { loader as ProductsLoader } from './views/Products'
import { action as formAction } from './views/NewProduct'
import EditProduct from "./views/EditProdut";
import { loader as loaderProduct, action as actionProduct } from './views/EditProdut'
import { action as deleteAction } from './components/ProductDetails'
import { action as updateAvailabilityState } from './views/Products'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: ProductsLoader,
                action: updateAvailabilityState
            },
            {
                path: 'new/product',
                element: <NewProduct />,
                action: formAction
            },
            {
                path: 'products/:id/edit',//ROA Pattern
                element: <EditProduct />,
                loader: loaderProduct,
                action: actionProduct
            },
            {
                path: 'products/:id/delete',

                action: deleteAction
            }

        ]
    }
])
