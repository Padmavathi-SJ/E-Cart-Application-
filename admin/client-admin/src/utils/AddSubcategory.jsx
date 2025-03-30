import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const AddSubcategory = ({ categoryId, onSubcategoryAdded, onClose }) => {
    const [newSubcategory, setNewSubcategory] = useState("");

    const handleAddSubcategory = async () => {
        if (!newSubcategory.trim()) {
            alert("Enter a subcategory name");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5001/admin/subcategories", {
                c_id: categoryId,
                sub_name: newSubcategory
            });

            if (response.data.success) {
                alert("Subcategory added!");
                setNewSubcategory("");
                onSubcategoryAdded();
            } else {
                alert("Failed to add subcategory");
            }
        } catch (error) {
            console.error("Error adding subcategory:", error);
        }
    };

    return (
        <div>
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                <AiOutlineClose size={20} />
            </button>

            <h2 className="text-lg font-bold mb-4">Add Subcategory</h2>
            <input
                type="text"
                className="p-2 border rounded w-full"
                placeholder="Subcategory Name"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAddSubcategory}>Add</button>
            </div>
        </div>
    );
};

export default AddSubcategory;