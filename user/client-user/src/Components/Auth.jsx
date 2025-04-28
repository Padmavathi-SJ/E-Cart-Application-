import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth({ onLoginSuccess, closeModal }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


const handleSubmit = async () => {
    setError(""); // Clear previous errors

    if (!email || !password || (!isLogin && !name)) {
        setError("All fields are required.");
        return;
    }

    try {
        if (isLogin) {
            const res = await axios.post("http://localhost:5000/auth/login", { email, password });
            
            console.log("Login response:", res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);
            alert(res.data.message);

            if(onLoginSuccess) onLoginSuccess(res.data.name);
            if(closeModal) closeModal();
            navigate("/");
        } else {
            const res = await axios.post("http://localhost:5000/auth/register", { name, email, password });
            
            console.log("Register response:", res.data);
            alert(res.data.message);
            setIsLogin(true);
        }
    } catch (error) {
        console.error("Auth error:", error);
        if (error.response) {
            setError(error.response.data.error || "Something went wrong.");
            alert(error.response.data.error || "Something went wrong.");
        } else {
            setError("Server error. Please try again later.");
            alert("Server error. Please try again later.");
        }
    }
};
    

   return (
        <div>
            <div>
                <h2 className="text-2xl font-bold text-center mb-6">
                    {isLogin ? "Login" : "Register"}
                </h2>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    {isLogin ? "Login" : "Register"}
                </button>

                <p
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-center text-blue-500 mt-4 text-sm cursor-pointer hover:underline"
                >
                    {isLogin ? "New user? Register here" : "Already have an account? Login here"}
                </p>
            </div>
        </div>
    );
}

export default Auth;
