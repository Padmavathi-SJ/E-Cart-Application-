import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const AddCategory = ({ onCategoryAdded, onClose }) => {
    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            alert("Enter a category name");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5001/admin/categories", { c_name: newCategory });
            
            if (data.success) {
                alert("Category added!");
                setNewCategory("");
                onCategoryAdded();
            } else {
                alert("Failed to add category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    return (
        <div>
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                <AiOutlineClose size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Add New Category</h2>
            <input
                type="text"
                className="p-2 border rounded w-full"
                placeholder="Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAddCategory}>Add</button>
            </div>
        </div>
    );
};

export default AddCategory;