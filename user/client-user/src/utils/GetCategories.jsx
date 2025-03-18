import { useEffect, useState } from "react";
import axios from "axios";

const GetCategories = ({ setIsOpen }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/category/categories");
            console.log("Fetched Categories:", response.data);
            setCategories(response.data.categories || []);
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError("Error fetching categories");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ul 
            className="w-full bg-white border rounded-md shadow-md z-20 max-h-60 overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when clicking inside
        >
            {loading ? (
                <li className="px-4 py-2 text-gray-500">Loading...</li>
            ) : error ? (
                <li className="px-4 py-2 text-red-500">{error}</li>
            ) : categories.length > 0 ? (
                categories.map((category) => (
                    <li
                        key={category.c_id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        {category.c_name}
                    </li>
                ))
            ) : (
                <li className="px-4 py-2 text-gray-500">No categories available</li>
            )}
        </ul>
    );
};

export default GetCategories;
