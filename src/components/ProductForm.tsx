
type ProductFormProps = {
    name?:string
    price?:number
}
export default function ProductForm({name, price}:ProductFormProps) {
    
    return (
        <>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Product Name:</label>
                <input
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Product Name"
                    name="name"
                    defaultValue={name}

                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Price:</label>
                <input
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Product Price. ex. 200, 300"
                    name="price"
                    defaultValue={price}

                />
            </div>
        </>
    )
}
