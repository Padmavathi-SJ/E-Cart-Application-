import { useState, useEffect } from "react";
import AddCategory from "../utils/AddCategory";

const Sidebar = () => {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

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

    return (
        <div className="w-64 bg-white text-gray-800 h-screen p-4 shadow-md">
            <nav className="space-y-3">
                {/* All Categories Section */}
                <div
                    className="relative flex items-center gap-2 cursor-pointer"
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                >
                    <span className="font-medium">All Categories</span>
                    <span 
                        className="text-xl font-bold text-gray-600 cursor-pointer" 
                        onClick={() => setShowAddCategory(true)} // Open form
                    >+</span>

                    {/* Dropdown Categories Box */}
                    {showCategories && (
                        <div className="absolute left-full top-0 mt-1 w-48 bg-white border border-gray-300 shadow-md p-2">
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <p key={cat.c_id} className="px-2 py-1 hover:bg-gray-100">{cat.c_name}</p>
                                ))
                            ) : (
                                <p className="px-2 py-1 text-gray-500">No categories</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Other Sidebar Items */}
                <p className="cursor-pointer hover:text-blue-600">Manage Products</p>
                <p className="cursor-pointer hover:text-blue-600">Orders</p>
                <p className="cursor-pointer hover:text-blue-600">Users</p>
            </nav>

            {/* Add Category Form */}
            {showAddCategory && (
                <div className="absolute left-64 top-10 w-80 p-4 bg-white border border-gray-300 shadow-md rounded-md">
                    <AddCategory 
                        onCategoryAdded={() => {
                            fetchCategories();
                            setShowAddCategory(false);
                        }} 
                        onClose={() => setShowAddCategory(false)} // Handle close
                    />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
