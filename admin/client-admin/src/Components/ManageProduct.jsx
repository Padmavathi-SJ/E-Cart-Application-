import { useState } from "react";
import AddProduct from "../utils/AddProduct";
import AddImages from "../utils/AddImages";

const ManageProduct = ({ sub_id }) => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddImages, setShowAddImages] = useState(false);

    if (!sub_id) return <h2 className="text-center text-red-500">No Subcategory Selected</h2>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Manage Products for Subcategory {sub_id}</h2>
            
            <div className="flex gap-4">
                {/* Add Product Button */}
                <button 
                    onClick={() => setShowAddProduct(!showAddProduct)} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    {showAddProduct ? "Close Add Product" : "Add Product"}
                </button>

                {/* Add Images Button */}
                <button 
                    onClick={() => setShowAddImages(!showAddImages)} 
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                    {showAddImages ? "Close Add Images" : "Add Images"}
                </button>
            </div>

            {/* Render AddProduct Component */}
            {showAddProduct && <AddProduct sub_id={sub_id} onClose={() => setShowAddProduct(false)} />}

            {/* Render AddImages Component */}
            {showAddImages && <AddImages sub_id={sub_id} onClose={() => setShowAddImages(false)} />}
        </div>
    );
};

export default ManageProduct;
