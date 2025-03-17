import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            if (isLogin) {
                const { data } = await axios.post("http://localhost:5000/auth/login", { email, password });
                alert(data.message);
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                await axios.post("http://localhost:5000/auth/register", { name, email, password });
                alert("Registration successful");
                setIsLogin(true);
            }
        } catch (error) {
            alert("Operation failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Login" : "Register"}</h2>
            {!isLogin && <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />}
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
                {isLogin ? "New user? Register here" : "Already registered? Login here"}
            </p>
        </div>
    );
}

export default Auth;
