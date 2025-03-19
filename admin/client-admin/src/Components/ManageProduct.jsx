import { useParams } from "react-router-dom";
import { useState } from "react";
import AddProduct from "../utils/AddProduct";

const ManageProduct = ({ sub_id }) => {
    const [showAddProduct, setShowAddProduct] = useState(false);

    if (!sub_id) return <h2 className="text-center text-red-500">No Subcategory Selected</h2>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Manage Products for Subcategory {sub_id}</h2>
            
            <button 
                onClick={() => setShowAddProduct(!showAddProduct)} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
                {showAddProduct ? "Close Add Product" : "Add Product"}
            </button>

    {showAddProduct && <AddProduct sub_id={sub_id} onClose={() => setShowAddProduct(false)} />}

        </div>
    );
};


export default ManageProduct;
