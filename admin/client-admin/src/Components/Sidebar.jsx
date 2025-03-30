import { useState, useEffect } from "react";
import ViewCategories from "../utils/ViewCategories";
import ViewSubcategories from "../utils/ViewSubcategories";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

const Sidebar = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);

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

    const handleCategoryClick = (c_id) => {
        setExpandedCategory(expandedCategory === c_id ? null : c_id);
    };

    return (
        <div className="relative flex">
            {/* Sidebar */}
            <div className="w-64 bg-white text-gray-800 h-screen p-4 shadow-md">
                <nav className="space-y-3">
                    <p 
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => setShowCategories(!showCategories)}
                    >
                        All Categories
                    </p>
                    <p className="cursor-pointer hover:text-blue-600">Orders</p>
                    <p className="cursor-pointer hover:text-blue-600">Contact</p>
                </nav>
            </div>
            
            {/* Categories Box (Appears on Click) */}
            {showCategories && (
                <div className="absolute left-64 top-0 w-80 bg-white p-4 shadow-md border border-gray-300">
                    <ul>
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <li key={cat.c_id} className="flex justify-between items-center cursor-pointer hover:text-blue-600 p-2 border-b">
                                    <span>{cat.c_name}</span>
                                    <button onClick={() => handleCategoryClick(cat.c_id)}>
                                        {expandedCategory === cat.c_id ? <ChevronUp /> : <ChevronDown />}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No categories found.</p>
                        )}
                    </ul>
                    {expandedCategory && <ViewSubcategories expandedCategory={expandedCategory} />}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
