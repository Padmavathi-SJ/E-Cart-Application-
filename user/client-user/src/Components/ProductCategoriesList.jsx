import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Import the api instance
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductCategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/products/product-categories");
            setCategories(response.data.productCategories || []);
        } catch (error) {
            console.error("Error fetching product categories:", error);
            if (error.response?.status === 401) {
                setError("Please login to view categories");
            } else {
                setError("Error loading categories");
            }
        }
    };

    const fetchSubCategories = async (p_id) => {
        if (subCategories[p_id]) return;
        try {
            const response = await api.get(`/products/product-categories/${p_id}/sub-products`);
            setSubCategories(prev => ({ ...prev, [p_id]: response.data.subProducts || [] }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-xl font-semibold mb-3">Product Categories</h2>
            <div className="space-y-2">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.p_id} className="border-b pb-2">
                            <div className="flex items-start justify-between gap-2">
                                <span className="font-medium w-full">{category.p_name}</span>
                                <button
                                    onClick={() => {
                                        setExpandedCategory(expandedCategory === category.p_id ? null : category.p_id);
                                        fetchSubCategories(category.p_id);
                                    }}
                                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                                >
                                    {expandedCategory === category.p_id ? <ChevronUp /> : <ChevronDown />}
                                </button>
                            </div>
                            {expandedCategory === category.p_id && (
                                <ul className="mt-2 pl-2 text-gray-700">
                                    {subCategories[category.p_id]?.length > 0 ? (
                                        subCategories[category.p_id].map((sub) => (
                                            <li
                                                key={sub.sub_p_id}
                                                className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer"
                                                onClick={() => navigate(`/subProductCategories/${sub.sub_p_id}/product-items`)}
                                            >
                                                {sub.sub_p_name}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500">No subcategories</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No product categories found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductCategoriesList;
