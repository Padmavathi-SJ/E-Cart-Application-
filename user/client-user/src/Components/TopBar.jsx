import { FaSearch, FaUserCircle } from "react-icons/fa";
import Auth from "./Auth";
import { useState } from "react";

const TopBar = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    return (
        <>
            <div className="w-full bg-blue-600 text-white flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <h1 className="text-2xl font-bold">E-Cart</h1>

                {/* Search Bar with Categories */}
                <div className="flex items-center bg-white rounded-md shadow-md overflow-hidden relative w-[500px] max-w-full">

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="px-4 py-2 w-full border-l border-gray-300 focus:outline-none text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Search Icon */}
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 flex items-center justify-center">
                        <FaSearch />
                    </button>
                </div>

                {/* User Authentication Icon */}
                <FaUserCircle size={30} onClick={() => setShowAuth(true)} className="cursor-pointer" />
            </div>

            {/* Signup Modal */}
            {showAuth && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 min-h-[100px] flex flex-col items-center relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setShowAuth(false)}
                        >
                            ✖
                        </button>
                        <Auth />
                    </div>
                </div>
            )}
        </>
    );
};

export default TopBar;
