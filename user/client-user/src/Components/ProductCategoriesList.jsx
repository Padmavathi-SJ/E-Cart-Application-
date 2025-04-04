import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/products/product-categories");
            setCategories(response.data.productCategories || []);
        } catch (error) {
            console.error("Error fetching product categories:", error);
        }
    };

    const fetchSubCategories = async (p_id) => {
        if (subCategories[p_id]) return;
        try {
            const response = await axios.get(`http://localhost:5000/products/product-categories/${p_id}/sub-products`);
            setSubCategories(prev => ({ ...prev, [p_id]: response.data.subProducts || [] }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    return (
        <div className="w-1/4 p-2">
            <h2 className="text-xl font-semibold mb-3">Product Categories</h2>
            <div className="space-y-2">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.p_id} className=" border-b">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{category.p_name}</span>
                                <button
                                    onClick={() => {
                                        setExpandedCategory(expandedCategory === category.p_id ? null : category.p_id);
                                        fetchSubCategories(category.p_id);
                                    }}
                                    className="text-gray-400 hover:text-gray-400"
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