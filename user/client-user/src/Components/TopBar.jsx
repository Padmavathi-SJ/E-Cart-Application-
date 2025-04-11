import { FaSearch, FaUserCircle, FaTimes, FaBars } from "react-icons/fa";
import Auth from "./Auth";
import CategoryList from "./CategoryList";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [username, setUsername] = useState("");
    const categoryRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem("name");
        setUsername(storedName || "");
    }, [showAuth]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(categoryRef.current &&
                !categoryRef.current.contains(event.target) &&
                !event.target.closest("#category-toggle")
            ) {
                setShowCategory(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
        <div className="w-full bg-blue-600 text-white flex items-center justify-between px-6 py-3 z-20 relative">
            {/* Left Side: Logo, Menu Toggle, CategoryList */}
            <div className="flex items-center gap-4">
                {/* Logo */}
                <h1 
                className="text-2xl font-bold cursor-pointer"
                onClick={() => navigate("/")}
                >E-Cart</h1>

                {/* Toggle Icon */}
                <FaBars
                    size={22}
                    className="cursor-pointer hover:text-gray-300"
                    onClick={() => setShowCategory((prev) => !prev)}
                />
                </div>
            

            {/* Right Side: Auth Icon */}
            <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowAuth(true)}>
                <FaUserCircle size={30} />
                {username && <span className="text-sm mt-1">{username}</span>}
            </div>

            </div>

            {showCategory && (
                <div
                ref={categoryRef}
                className="absolute left-6 top-[60px] z-40 bg-white shadow-lg border rounded-md"
                >
                    <CategoryList />
                </div>
            )}

            {/* Auth Modal */}
            {showAuth && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setShowAuth(false)}
                        >
                            ✖
                        </button>
                        <Auth
                            onLoginSuccess={(name) => setUsername(name)}
                            closeModal={() => setShowAuth(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default TopBar;
