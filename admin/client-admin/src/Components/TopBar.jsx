import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Auth from "./Auth";

const TopBar = () => {
    const [showAuth, setShowAuth] = useState(false);

    return (
        <>
            <div className="w-full bg-gray-800 text-white flex items-center justify-between px-6 py-3">
                <h1 className="text-2xl font-bold">Admin Panel</h1>

                {/* Admin Login Button */}
                <FaUserCircle size={30} onClick={() => setShowAuth(true)} className="cursor-pointer" />
            </div>

            {/* Show Auth Modal */}
            {showAuth && <Auth onClose={() => setShowAuth(false)} />}
        </>
    );
};

export default TopBar;
