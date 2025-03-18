import { FaSearch, FaUserCircle } from "react-icons/fa";
import CategoriesDropdown from "./AllCateories";
import Auth from "./Auth";
import { useState } from "react";

const TopBar = () => {
    const [showAuth, setShowAuth] = useState(false);

    return (
        <>
            <div className="w-full bg-blue-600 text-white flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <h1 className="text-2xl font-bold">E-Cart</h1>

                {/* Search Bar with Categories */}
                <div className="flex items-center bg-white rounded-md overflow-hidden">
                    <CategoriesDropdown />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="px-4 py-2 w-64 border-none focus:outline-none text-black"
                    />
                    <button className="px-4 py-2 bg-yellow-500 text-black rounded-r-md hover:bg-yellow-600">
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
