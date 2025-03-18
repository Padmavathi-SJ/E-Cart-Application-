import { useState, useEffect } from "react";
import axios from "axios";

const CategoryList = () => {
    const [categories, setCategories] = useState([]); // Ensure it's an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/category/categories");
                
                if (Array.isArray(response.data)) {
                    setCategories(response.data); // Ensure data is an array
                } else {
                    console.error("Invalid data format:", response.data);
                    setCategories([]); // Fallback to empty array
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Failed to load categories.");
                setCategories([]); // Prevents map error
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p className="text-center">Loading categories...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="w-64 bg-white shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <ul className="space-y-2">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <li key={category.c_id} className="border-b pb-2">
                            <details className="group">
                                <summary className="cursor-pointer font-medium flex justify-between items-center">
                                    {category.c_name}
                                    <span className="text-sm text-gray-500 group-open:rotate-180">▼</span>
                                </summary>
                                <ul className="mt-2 ml-4 space-y-1">
                                    {Array.isArray(category.subcategories) ? (
                                        category.subcategories.map((sub) => (
                                            <li key={sub.sub_id} className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer">
                                                {sub.sub_name}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-500">No subcategories</li>
                                    )}
                                </ul>
                            </details>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No categories found.</p>
                )}
            </ul>
        </div>
    );
};

export default CategoryList;
