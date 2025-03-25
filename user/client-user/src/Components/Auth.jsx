import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
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
                const { data } = await axios.post("http://localhost:5000/auth/login", { email, password });
                alert(data.message);
                localStorage.setItem("token", data.token);
               
            } else {
                const { data } = await axios.post("http://localhost:5000/auth/register", { name, email, password });
                alert(data.message);
                setIsLogin(true); // Stay on login page after registration
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || "Something went wrong.");
            } else {
                setError("Server error. Please try again later.");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center mb-6">{isLogin ? "Login" : "Register"}</h2>
                
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                
                {!isLogin && (
                    <input 
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
                    />
                )}

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
                />

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
                />

                <button 
                    onClick={handleSubmit} 
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    {isLogin ? "Login" : "Register"}
                </button>

                <p 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-center text-sm text-blue-500 mt-4 cursor-pointer hover:underline"
                >
                    {isLogin ? "New user? Register here" : "Already registered? Login here"}
                </p>
            </div>
        </div>
    );
}

export default Auth;
