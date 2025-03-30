import { useEffect, useState } from "react";
import axios from "axios";

const ViewSubcategories = () => {
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
        try {
            const response = await axios.get(`http://localhost:5001/admin/categories/${c_id}/subcategories`);
            setSubcategories((prev) => ({ ...prev, [c_id]: response.data.subcategories || [] }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const handleCategoryClick = (c_id) => {
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
        <div className="mt-2">
            <h2 className="text-xl font-bold mb-2">All Categories & Subcategories</h2>
            <ul className="list-disc pl-5">
                {categories.length > 0 ? (
                    categories.map((cat) => (
                        <li key={cat.c_id} className="relative">
                            <span 
                                className="font-semibold cursor-pointer hover:text-blue-600"
                                onClick={() => handleCategoryClick(cat.c_id)}
                            >
                                {cat.c_name}
                            </span>

                            {expandedCategory === cat.c_id && (
                                <ul className="mt-2 pl-6 list-disc text-gray-700 bg-gray-100 p-2 rounded-md shadow-md">
                                    {subcategories[cat.c_id] && subcategories[cat.c_id].length > 0 ? (
                                        subcategories[cat.c_id].map((sub) => (
                                            <li key={sub.sub_id}>{sub.sub_name}</li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500">No subcategories</li>
                                    )}
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

export default ViewSubcategories;
