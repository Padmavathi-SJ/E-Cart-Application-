import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddCategory from "../utils/AddCategory";
import AddSubcategory from "../utils/AddSubcategory";

const Sidebar = () => {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddSubcategory, setShowAddSubcategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});
    const [expandedCategory, setExpandedCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:5001/admin/categories");
            const data = await response.json();
            setCategories(data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubcategories = async (c_id) => {
        try {
            const response = await fetch(`http://localhost:5001/admin/categories/${c_id}/subcategories`);
            const data = await response.json();
            setSubcategories((prev) => ({ ...prev, [c_id]: data.subcategories || [] }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const toggleSubcategories = (c_id) => {
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
        <div className="w-64 bg-white text-gray-800 h-screen p-4 shadow-md">
            <nav className="space-y-3">
                <div className="relative flex items-center gap-2 cursor-pointer">
                    <span className="font-medium">All Categories</span>
                    <span
                        className="text-xl font-bold text-gray-600 cursor-pointer"
                        onClick={() => setShowAddCategory(true)}
                    >
                        +
                    </span>
                </div>

                {categories.length > 0 && (
                    <div className="mt-2">
                        {categories.map((cat) => (
                            <div key={cat.c_id} className="px-2 py-1">
                                <div
                                    className="flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                                    onClick={() => toggleSubcategories(cat.c_id)}
                                >
                                    <span>{cat.c_name}</span>
                                    <div className="flex items-center gap-2">
                                        {expandedCategory === cat.c_id ? <FaChevronUp /> : <FaChevronDown />}
                                        <span
                                            className="text-lg font-bold text-gray-600 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowAddSubcategory(cat.c_id);
                                            }}
                                        >
                                            +
                                        </span>
                                    </div>
                                </div>

                                {expandedCategory === cat.c_id && subcategories[cat.c_id] && (
                                    <ul className="pl-4 mt-1 text-gray-700">
                                        {subcategories[cat.c_id].length > 0 ? (
                                            subcategories[cat.c_id].map((sub) => (
                                                <li
                                                key={sub.sub_id}
                                                className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => navigate(`/manage-products/${sub.sub_id}`)} 
                                            >
                                                <span>{sub.sub_name}</span>
                                                <span className="text-gray-500">{">"}</span>
                                            </li>
                                            
                                            
                                            
                                            ))
                                        ) : (
                                            <li className="text-gray-500">No subcategories</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <p className="cursor-pointer hover:text-blue-600">Orders</p>
                <p className="cursor-pointer hover:text-blue-600">Users</p>
            </nav>

            {showAddCategory && (
                <div className="absolute left-64 top-10 w-80 p-4 bg-white border border-gray-300 shadow-md rounded-md">
                    <AddCategory
                        onCategoryAdded={() => {
                            fetchCategories();
                            setShowAddCategory(false);
                        }}
                        onClose={() => setShowAddCategory(false)}
                    />
                </div>
            )}

            {showAddSubcategory && (
                <div className="absolute left-64 top-20 w-80 p-4 bg-white border border-gray-300 shadow-md rounded-md">
                    <AddSubcategory
                        categoryId={showAddSubcategory}
                        onSubcategoryAdded={() => {
                            fetchCategories();
                            setShowAddSubcategory(null);
                        }}
                        onClose={() => setShowAddSubcategory(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
