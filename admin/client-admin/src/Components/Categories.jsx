import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";

const Categories = ({ setShowAddSubcategory, setSelectedCategoryId }) => {
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState({});

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5001/admin/categories");
            setCategories(response.data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubcategories = async (c_id) => {
      //  console.log("Fetching subcategories for category ID:", c_id);
        try {
            const response = await axios.get(`http://localhost:5001/admin/categories/${c_id}/subcategories`);
          //  console.log("Fetched subcategories response:", response.data);
            setSubcategories((prev) => ({
                ...prev,
                [c_id]: response.data.subcategories || [],
            }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const toggleCategory = (c_id) => {
        if (expandedCategory === c_id) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(c_id);
            if (!subcategories[c_id]) {
                fetchSubcategories(c_id);
            }
        }
    };

    return (
        <div className="absolute left-64 top-0 w-80 bg-white p-4 shadow-md border border-gray-300">
            <ul>
                {categories.length > 0 ? (
                    categories.map((cat) => (
                        <li key={cat.c_id} className="p-2 border-b">
                            <div className="flex justify-between items-center">
                                <span 
                                    className="cursor-pointer hover:text-blue-600" 
                                    onClick={() => toggleCategory(cat.c_id)}
                                >
                                    {cat.c_name}
                                </span>
                                <button 
                                    className="text-green-600 hover:text-green-800" 
                                    onClick={() => {
                                        setSelectedCategoryId(cat.c_id);
                                        setShowAddSubcategory(true);
                                    }}
                                >
                                    <PlusCircle size={20} />
                                </button>
                                <button 
                                    onClick={() => toggleCategory(cat.c_id)} // Ensure dropdown click also fetches subcategories
                                >
                                    {expandedCategory === cat.c_id ? <ChevronUp /> : <ChevronDown />}
                                </button>
                            </div>
                            {expandedCategory === cat.c_id && (
                                <ul className="mt-2 pl-4 list-disc text-gray-700 bg-gray-100 p-2 rounded-md shadow-md">
                                    {subcategories[cat.c_id]?.length > 0 
                                        ? subcategories[cat.c_id].map((sub) => (
                                            <li key={sub.sub_id} className="ml-4">{sub.sub_name}</li>
                                        )) 
                                        : <li className="text-gray-500 ml-4">No subcategories</li>
                                    }
                                </ul>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No categories found.</p>
                )}
            </ul>
        </div>
    );
};

export default Categories;
