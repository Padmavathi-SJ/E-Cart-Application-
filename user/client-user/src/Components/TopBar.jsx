import { FaSearch, FaUserCircle, FaTimes } from "react-icons/fa";
import Auth from "./Auth";
import { useState, useEffect } from "react";
import CategoryList from "./CategoryList";

const TopBar = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSidebar, setShowSidebar] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("name");
        setUsername(storedName || "");
      
    }, [showAuth]);

    return (
        <>
            <div className="w-full bg-blue-600 text-white flex items-center justify-between px-6 py-3 z-20 relative">
                {/* Logo */}
                <h1 className="text-2xl font-bold">E-Cart</h1>

                {/* Search */}
                <div className="flex items-center bg-white rounded-md shadow-md overflow-hidden relative w-[500px] max-w-full">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="px-4 py-2 w-full border-l border-gray-300 focus:outline-none text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
                        <FaSearch />
                    </button>
                </div>

                {/* Auth Icon */}
                <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowAuth(true)}>
                    <FaUserCircle size={30} />
                    {username && <span className="text-sm mt-1">{username}</span>}
                </div>
            </div>

            {/* Sidebar - only visible in TopBar */}
            {showSidebar && (
                <>
                    <div className="fixed inset-0 flex z-40">
                        <div className="w-64 bg-white shadow-lg h-full">
                            <div className="flex justify-end p-3">
                                <button onClick={() => setShowSidebar(false)}>
                                    <FaTimes />
                                </button>
                            </div>
                            <CategoryList />
                        </div>
                        <div
                            className="flex-1 bg-black bg-opacity-40"
                            onClick={() => setShowSidebar(false)}
                        />
                    </div>
                </>
            )}

            {/* Signup/Login Modal */}
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
