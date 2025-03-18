// src/components/ViewCategories.jsx
import { useEffect, useState } from "react";

const ViewCategories = () => {
    const [categories, setCategories] = useState([]);

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
        <div className="mt-2">
            <h2 className="text-xl font-bold mb-2">All Categories</h2>
            <ul className="list-disc pl-5">
                {categories.length > 0 ? (
                    categories.map((cat) => <li key={cat.c_id}>{cat.c_name}</li>)
                ) : (
                    <p>No categories found.</p>
                )}
            </ul>
        </div>
    );
};

export default ViewCategories;
