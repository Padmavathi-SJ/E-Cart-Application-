import { FaSearch, FaUserCircle } from "react-icons/fa";
import CategoriesDropdown from "./AllCateory";
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
                <div className="flex items-center bg-white rounded-md shadow-md overflow-hidden relative w-[500px]">
                    <CategoriesDropdown />
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
