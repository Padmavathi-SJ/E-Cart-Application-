import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AddProduct = ({ sub_id, onClose }) => {
    const [product, setProduct] = useState({
        product_name: "",
        description: "",
        price: "",
        stock: "",
        brand: ""
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = { ...product, sub_id };

        try {
            const response = await fetch("http://localhost:5001/admin/add-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                alert("Product added successfully!");
                setProduct({
                    product_name: "",
                    description: "",
                    price: "",
                    stock: "",
                    brand: ""
                });
            } else {
                alert("Error adding product.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto relative">
            {/* Close Button */}
            <button 
                onClick={onClose} 
                className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
            >
                <AiOutlineClose size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    name="product_name" 
                    value={product.product_name} 
                    placeholder="Product Name" 
                    required 
                    className="border p-2 w-full rounded-md" 
                    onChange={handleChange} 
                />
                <textarea 
                    name="description" 
                    value={product.description} 
                    placeholder="Description" 
                    required 
                    className="border p-2 w-full rounded-md" 
                    onChange={handleChange} 
                />
                <input 
                    type="number" 
                    name="price" 
                    value={product.price} 
                    placeholder="Price" 
                    required 
                    className="border p-2 w-full rounded-md" 
                    onChange={handleChange} 
                />
                <input 
                    type="number" 
                    name="stock" 
                    value={product.stock} 
                    placeholder="Stock" 
                    required 
                    className="border p-2 w-full rounded-md" 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="brand" 
                    value={product.brand} 
                    placeholder="Brand" 
                    className="border p-2 w-full rounded-md" 
                    onChange={handleChange} 
                />
                <button 
                    type="submit" 
                    className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700 transition"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
