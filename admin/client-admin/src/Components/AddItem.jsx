import { useState, useEffect } from "react";
import axios from "axios";

const AddItem = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        item_name: "",
        item_description: "",
        special_content: "",
        price: "",
        stock_quantity: ""
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5001/admin/categories");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubcategories = async (c_id) => {
        try {
            const response = await axios.get(`http://localhost:5001/admin/categories/${c_id}/subcategories`);
            setSubcategories(response.data.subcategories);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        setSelectedSubcategory("");
        fetchSubcategories(categoryId);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSubcategory) {
            alert("Please select a subcategory");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("sub_id", selectedSubcategory);
        formDataToSend.append("c_id", selectedCategory);
        formDataToSend.append("item_name", formData.item_name);
        formDataToSend.append("item_description", formData.item_description);
        formDataToSend.append("special_content", formData.special_content);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("stock_quantity", formData.stock_quantity);
        formDataToSend.append("item_image", image); // Ensure name matches


        try {
            await axios.post("http://localhost:5001/admin/add-item", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Item added successfully");
            setFormData({
                item_name: "",
                item_description: "",
                special_content: "",
                price: "",
                stock_quantity: ""
            });
            setImage(null);
        } catch (error) {
            console.error("Error adding item:", error);
            alert("Error adding item");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selection */}
                <select className="w-full p-2 border rounded" value={selectedCategory} onChange={handleCategoryChange} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.c_id} value={cat.c_id}>{cat.c_name}</option>
                    ))}
                </select>

                {/* Subcategory Selection */}
                <select className="w-full p-2 border rounded" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} required>
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub) => (
                        <option key={sub.sub_id} value={sub.sub_id}>{sub.sub_name}</option>
                    ))}
                </select>

                {/* Item Name */}
                <input type="text" name="item_name" placeholder="Item Name" className="w-full p-2 border rounded" value={formData.item_name} onChange={handleInputChange} required />

                {/* Item Description */}
                <textarea name="item_description" placeholder="Item Description" className="w-full p-2 border rounded" value={formData.item_description} onChange={handleInputChange} required />

                {/* Special Content */}
                <textarea name="special_content" placeholder="Special Content" className="w-full p-2 border rounded" value={formData.special_content} onChange={handleInputChange} required />

                {/* Price */}
                <input type="number" name="price" placeholder="Price" className="w-full p-2 border rounded" value={formData.price} onChange={handleInputChange} required />

                {/* Stock Quantity */}
                <input type="number" name="stock_quantity" placeholder="Stock Quantity" className="w-full p-2 border rounded" value={formData.stock_quantity} onChange={handleInputChange} required />

                {/* Image Upload */}
                <input
    type="file"
    name="item_image"
    className="w-full p-2 border rounded"
    onChange={handleImageChange} // Call function to set the image
/>




                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;
