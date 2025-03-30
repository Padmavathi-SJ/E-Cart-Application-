import { useState, useEffect } from "react";
import axios from "axios";

const AddImages = ({ onClose }) => {
    const [subId, setSubId] = useState(localStorage.getItem("sub_id") || null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (!subId) return;
    
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5001/admin/get-products/${subId}`);
                setProducts(data.map(product => ({ product_id: product.product_id, product_name: product.product_name })));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchProducts();
    }, [subId]);

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
            const { status } = await axios.post("http://localhost:5001/admin/add-image", formData);
            
            if (status === 200) {
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
            <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="border p-2 w-full rounded-md mb-4">
                <option value="">Select a Product</option>
                {products.map((product) => (
                    <option key={product.product_id} value={product.product_id}>{product.product_name}</option>
                ))}
            </select>
            {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover mb-4 rounded-md" />}
            <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full rounded-md" />
            <button onClick={handleUpload} className="bg-blue-600 text-white p-2 rounded-md w-full mt-3 hover:bg-blue-700 transition">Upload Image</button>
        </div>
    );
};

export default AddImages;
