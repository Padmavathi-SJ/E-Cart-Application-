import { useState, useEffect } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import GetCategories from "../utils/GetCategories";

const CategoriesDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".categories-dropdown")) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex items-center border rounded-md shadow-sm bg-white categories-dropdown">
            {/* Dropdown Button */}
            <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-l-md focus:outline-none"
                onClick={(e) => {
                    e.stopPropagation(); // Prevents closing when clicking inside
                    setIsOpen(!isOpen);
                }}
            >
                All Categories <FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
            </button>

            {/* Dropdown Menu (Fetched Categories) */}
            {isOpen && (
                <div className="absolute top-full left-0 w-56 bg-white border rounded-md shadow-md z-20">
                    <GetCategories setIsOpen={setIsOpen} />
                </div>
            )}

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for products..."
                className="px-4 py-2 w-full border-l border-gray-300 focus:outline-none"
            />

            {/* Search Icon */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
                <FaSearch />
            </button>
        </div>
    );
};

export default CategoriesDropdown;
