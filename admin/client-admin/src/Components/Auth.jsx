import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const Auth = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/admin/login", formData, {
                headers: { "Content-Type": "application/json" },
            });
            
            if (res.data.success) {
                alert("Login successful!");
                navigate("/"); // Redirect to Home Page after login
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Admin Email"
                    className="p-2 border rounded"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 border rounded"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit" className="bg-red-600 text-white py-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Auth;
