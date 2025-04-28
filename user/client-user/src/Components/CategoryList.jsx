import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Use the api instance instead of axios directly

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No authentication token found");
                }

                const response = await api.get("/category/categories");
                
                console.log("Fetched Data:", response.data);

                if (response.data && response.data.success && Array.isArray(response.data.categories)) {
                    setCategories(response.data.categories);
                } else {
                    console.error("Invalid data format:", response.data);
                    setCategories([]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                
                // Handle different error cases
                if (error.response) {
                    if (error.response.status === 401) {
                        setError("Please login to view categories");
                        // Optional: redirect to login
                        // navigate('/login');
                    } else if (error.response.status === 403) {
                        setError("Session expired. Please login again");
                        // Clear invalid token
                        localStorage.removeItem('token');
                    } else {
                        setError("Failed to load categories");
                    }
                } else if (error.message === "No authentication token found") {
                    setError("Please login to view categories");
                } else {
                    setError("Network error. Please try again later");
                }
                
                setCategories([]);
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
                                    {category.subcategories.length > 0 ? (
                                        category.subcategories.map((sub) => (
                                            <li 
                                                key={sub.sub_id} 
                                                className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer"
                                                onClick={() => navigate(`/subcategories/${sub.sub_id}/items`)}
                                            >
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