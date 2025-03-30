import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import { AddProduct, AddSubProduct } from "../utils/ProductHelper";

const ProductCategories = () => {
    const [products, setProducts] = useState([]);
    const [expandedProduct, setExpandedProduct] = useState(null);
    const [subProducts, setSubProducts] = useState({});
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddSubProduct, setShowAddSubProduct] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5001/admin/product-categories");
            setProducts(response.data.productCategories || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchSubProducts = async (p_id) => {
        try {
            const response = await axios.get(`http://localhost:5001/admin/product-categories/${p_id}/sub-products`);
            setSubProducts((prev) => ({ ...prev, [p_id]: response.data.subProducts || [] }));
        } catch (error) {
            console.error("Error fetching sub-products:", error);
        }
    };

    return (
        <div className="absolute left-64 top-0 w-80 bg-white p-4 shadow-md border border-gray-300">
            <button onClick={() => setShowAddProduct(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
                Add Product
            </button>
            {showAddProduct && <AddProduct onProductAdded={fetchProducts} />}

            <ul>
    {products.length > 0 ? (
        products.map((product) => (
            <li key={product.p_id} className="p-2 border-b">
                <div className="flex justify-between items-center">
                    {/* Click Product Name - No Fetching Here */}
                    <span className="cursor-pointer hover:text-blue-600">
                        {product.p_name}
                    </span>

                    {/* Click Plus Icon - Open Add SubProduct */}
                    <button className="text-green-600 hover:text-green-800" onClick={() => setShowAddSubProduct(true)}>
                        <PlusCircle size={20} />
                    </button>

                    {/* Click Dropdown - Fetch Subcategories & Expand */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering other clicks
                            if (!subProducts[product.p_id]) {
                                fetchSubProducts(product.p_id); // Fetch subcategories only if not already loaded
                            }
                            setExpandedProduct(expandedProduct === product.p_id ? null : product.p_id);
                        }}
                    >
                        {expandedProduct === product.p_id ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>

                {/* Subcategories List - Show only if expanded */}
                {expandedProduct === product.p_id && (
                    <ul className="mt-2 pl-4 list-disc text-gray-700 bg-gray-100 p-2 rounded-md shadow-md">
                        {subProducts[product.p_id]?.length > 0 ? (
                            subProducts[product.p_id].map((sub) => (
                                <li key={sub.sub_p_id} className="ml-4">{sub.sub_p_name}</li>
                            ))
                        ) : (
                            <li className="text-gray-500 ml-4">No sub-products</li>
                        )}
                    </ul>
                )}
            </li>
        ))
    ) : (
        <p>No products found.</p>
    )}
</ul>



            {showAddSubProduct && <AddSubProduct onSubProductAdded={fetchProducts} products={products} />}
        </div>
    );
};

export default ProductCategories;