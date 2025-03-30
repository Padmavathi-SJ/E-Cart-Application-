import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import AddSubcategory from "../utils/AddSubcategory";
import AddCategory from "../utils/AddCategory";
import { AddProduct } from "../utils/ProductHelper"; // Import AddProduct component

const Sidebar = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState({});
    const [showAddSubcategory, setShowAddSubcategory] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false); // New state for AddProduct modal

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

    const handleAddSubcategoryClick = (c_id) => {
        setSelectedCategoryId(c_id);
        setShowAddSubcategory(true);
    };

    return (
        <div className="relative flex">
            {/* Sidebar */}
            <div className="w-64 bg-white text-gray-800 h-screen p-4 shadow-md">
                <nav className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p 
                            className="cursor-pointer hover:text-blue-600"
                            onClick={() => setShowCategories(!showCategories)}
                        >
                            All Categories
                        </p>
                        <button 
                            className="text-green-600 hover:text-green-800"
                            onClick={() => setShowAddCategory(true)}
                        >
                            <PlusCircle size={20} />
                        </button>
                    </div>
                    
                    {/* Product Categories with AddProduct Icon */}
                    <div className="flex items-center justify-between">
                        <p className="cursor-pointer hover:text-blue-600">Product Categories</p>
                        <button 
                            className="text-green-600 hover:text-green-800"
                            onClick={() => setShowAddProduct(true)} // Show AddProduct modal
                        >
                            <PlusCircle size={20} />
                        </button>
                    </div>
                    
                    <p className="cursor-pointer hover:text-blue-600">Contact</p>
                </nav>
            </div>

            {/* Categories Box (Appears on Click) */}
            {showCategories && (
                <div className="absolute left-64 top-0 w-80 bg-white p-4 shadow-md border border-gray-300">
                    <ul>
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <li key={cat.c_id} className="p-2 border-b">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span 
                                                className="cursor-pointer hover:text-blue-600"
                                                onClick={() => handleCategoryClick(cat.c_id)}
                                            >
                                                {cat.c_name}
                                            </span>
                                            <button 
                                                className="text-green-600 hover:text-green-800"
                                                onClick={() => handleAddSubcategoryClick(cat.c_id)}
                                            >
                                                <PlusCircle size={20} />
                                            </button>
                                        </div>
                                        <button onClick={() => handleCategoryClick(cat.c_id)}>
                                            {expandedCategory === cat.c_id ? <ChevronUp /> : <ChevronDown />}
                                        </button>
                                    </div>

                                    {/* Display Subcategories */}
                                    {expandedCategory === cat.c_id && (
                                        <ul className="mt-2 pl-4 list-disc text-gray-700 bg-gray-100 p-2 rounded-md shadow-md">
                                            {subcategories[cat.c_id] && subcategories[cat.c_id].length > 0 ? (
                                                subcategories[cat.c_id].map((sub) => (
                                                    <li key={sub.sub_id} className="ml-4">{sub.sub_name}</li>
                                                ))
                                            ) : (
                                                <li className="text-gray-500 ml-4">No subcategories</li>
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
            )}

            {/* AddSubcategory Modal */}
            {showAddSubcategory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg relative w-96">
                        <AddSubcategory
                            categoryId={selectedCategoryId}
                            onSubcategoryAdded={() => {
                                fetchSubcategories(selectedCategoryId);
                                setShowAddSubcategory(false);
                            }}
                            onClose={() => setShowAddSubcategory(false)}
                        />
                    </div>
                </div>
            )}

            {/* AddCategory Modal */}
            {showAddCategory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg relative w-96">
                        <AddCategory
                            onCategoryAdded={() => {
                                fetchCategories();
                                setShowAddCategory(false);
                            }}
                            onClose={() => setShowAddCategory(false)}
                        />
                    </div>
                </div>
            )}

            {/* AddProduct Modal */}
            {showAddProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg relative w-96">
                        <AddProduct
                            onProductAdded={() => {
                                setShowAddProduct(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
