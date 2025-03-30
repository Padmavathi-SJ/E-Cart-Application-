import { useState } from "react";
import axios from "axios";

// AddProduct Component
const AddProduct = ({ onProductAdded }) => {
    const [p_name, setPName] = useState("");

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/admin/add-product", { p_name });
            alert(res.data.message); // Success alert
            setPName("");
            if (onProductAdded) onProductAdded();
        } catch (err) {
            alert("Error adding product"); // Error alert
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    value={p_name}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="Enter product name"
                    required
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

// AddSubProduct Component
const AddSubProduct = ({ onSubProductAdded, products }) => {
    const [p_id, setPId] = useState("");
    const [sub_p_name, setSubPName] = useState("");

    const handleAddSubProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/add-sub-product", { p_id, sub_p_name });
            alert(res.data.message); // Success alert
            setSubPName("");
            if (onSubProductAdded) onSubProductAdded();
        } catch (err) {
            alert("Error adding sub-product"); // Error alert
        }
    };

    return (
        <div>
            <h2>Add Sub-Product</h2>
            <form onSubmit={handleAddSubProduct}>
                <select value={p_id} onChange={(e) => setPId(e.target.value)} required>
                    <option value="">Select Product</option>
                    {products.map((product) => (
                        <option key={product.p_id} value={product.p_id}>
                            {product.p_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={sub_p_name}
                    onChange={(e) => setSubPName(e.target.value)}
                    placeholder="Enter sub-product name"
                    required
                />
                <button type="submit">Add Sub-Product</button>
            </form>
        </div>
    );
};

export { AddProduct, AddSubProduct };
