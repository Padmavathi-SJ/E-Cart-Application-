import { useState, useEffect } from "react";

const AddImages = ({ sub_id, onClose }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5001/admin/get-products/${sub_id}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [sub_id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!image || !selectedProduct) {
            alert("Please select a product and an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("product_id", selectedProduct);
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:5001/admin/add-image", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("Image uploaded successfully!");
                setImage(null);
                setPreview("");
            } else {
                alert("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto relative">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-red-600">✖</button>
            <h2 className="text-lg font-semibold mb-4 text-center">Upload Image</h2>
            <select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)} 
                className="border p-2 w-full rounded-md mb-4"
            >
                <option value="">Select a Product</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                ))}
            </select>
            {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover mb-4 rounded-md" />}
            <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full rounded-md" />
            <button onClick={handleUpload} className="bg-blue-600 text-white p-2 rounded-md w-full mt-3 hover:bg-blue-700 transition">Upload Image</button>
        </div>
    );
};

export default AddImages;
