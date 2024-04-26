import { safeParse } from "valibot"
import { draftProductSchema, ProductsSchema, ProductSchema, Product } from "../types"
import { lowerCase } from '../utils/index'
import axios from "axios"

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProducts = async (data: ProductData) => {
    try {
        const result = safeParse(draftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_URL_API}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price,
            })
        } else {
            throw new Error('Invalid Data');

        }



    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_URL_API}/api/products`
        const { data } = await axios(url)
        // console.log(data.data)
        const result = safeParse(ProductsSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('Error')
        }

        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_URL_API}/api/products`
        const { data } = await axios.get(`${url}/${id}`)
        const result = safeParse(ProductSchema, data.data)
        // console.log(result);
        if (result.success) {
            return result.output
        } else {
            throw new Error('Error')
        }

    } catch (error) {
        console.log(error)
    }
}

export const editProduct = async (data: ProductData, id: Product['id']) => {

    // console.log(data)
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: lowerCase(data.availability.toString())

        })

        console.log(result)
        if (result.success) {
            const url = `${import.meta.env.VITE_URL_API}/api/products/${id}`
            await axios.put(url, result.output)
        }

    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_URL_API}/api/products`

        await axios.delete(`${url}/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_URL_API}/api/products`
        await axios.patch(`${url}/${id}`)
    } catch (error) {
        console.log(error)
    }
}