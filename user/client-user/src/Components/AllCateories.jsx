import { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const CategoriesDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const categories = ["Electronics", "Fashion", "Home Appliances", "Books", "Toys"];

    return (
        <div className="relative">
            {/* Dropdown Button */}
            <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-l-md focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                All Categories <FaChevronDown />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10">
                    {categories.map((category, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoriesDropdown;
