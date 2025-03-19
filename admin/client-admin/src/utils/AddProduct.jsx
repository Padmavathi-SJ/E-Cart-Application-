import { useState } from "react";

const AddProduct = ({ sub_id }) => {
    const [product, setProduct] = useState({
        product_name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        images: []
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setProduct({ ...product, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("sub_id", sub_id);
        formData.append("product_name", product.product_name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("brand", product.brand);
        product.images.forEach((image) => formData.append("images", image));

        try {
            const response = await fetch("http://localhost:5001/admin/add-product", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                alert("Product added successfully!");
            } else {
                alert("Error adding product.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" name="product_name" placeholder="Product Name" required className="border p-2 w-full" onChange={handleChange} />
                <textarea name="description" placeholder="Description" required className="border p-2 w-full" onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" required className="border p-2 w-full" onChange={handleChange} />
                <input type="number" name="stock" placeholder="Stock" required className="border p-2 w-full" onChange={handleChange} />
                <input type="text" name="brand" placeholder="Brand" className="border p-2 w-full" onChange={handleChange} />
                <input type="file" multiple required className="border p-2 w-full" onChange={handleImageChange} />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
