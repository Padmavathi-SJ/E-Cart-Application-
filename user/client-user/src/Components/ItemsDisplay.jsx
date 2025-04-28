// components/ItemsDisplay.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";
import ProductCategoriesList from "./ProductCategoriesList";
import api from "../services/api"; // Import the api instance

const ItemsDisplay = () => {
    const { sub_id } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.get(`/items/subcategories/${sub_id}/items`);
                const data = response.data;
                if (data.success) {
                    setItems(data.items);
                } else {
                    setError("No items found for this subcategory.");
                }
            } catch (err) {
                console.error("Error fetching items:", err);
                if (err.response?.status === 401) {
                    setError("Please login to view items");
                    // Optionally redirect to login:
                    // navigate('/login');
                } else {
                    setError("Error fetching items. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [sub_id]);


    return (
        <>
            <TopBar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-center mb-6">Items</h1>

                <div className="flex flex-col md:flex-row gap-6 min-h-[600px]"> {/* 👈 Same height row */}
                    
                    {/* Sidebar - Left */}
                    <div className="md:w-1/4 w-full  h-full">
                        <ProductCategoriesList />
                    </div>

                    {/* Main Content - Right */}
                    <div className="md:w-3/4 w-full  h-full">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading items...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
                        ) : items.length === 0 ? (
                            <p className="text-center text-gray-500">No items available.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {items.map((item) => (
                                    <div key={item.item_id} className="bg-gray-50 border rounded-lg p-4">
                                        <img src={item.image_url} alt={item.item_name} className="w-full h-40 object-cover rounded-md" />
                                        <h3 className="text-lg font-semibold mt-2">{item.item_name}</h3>
                                        <p className="text-sm text-gray-500">{item.item_description}</p>
                                        <p className="font-semibold text-green-600 mt-2">₹{item.price}</p>
                                        <p className={`text-sm ${item.stock_quantity > 0 ? "text-green-500" : "text-red-500"}`}>
                                            {item.stock_quantity > 0 ? `In Stock (${item.stock_quantity})` : "Out of Stock"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemsDisplay;
