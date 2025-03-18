import { FaBars } from "react-icons/fa";
import TopBar from "../Components/TopBar";
import CategoryList from "../Components/CategoryList";
import CategoryHelper from "../utils/CategoryHelper"; // Import helper function

function Home() {
    const { sidebarOpen, toggleSidebar } = CategoryHelper(); // Use sidebar state from helper

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar Toggle Button */}
            <button
                className="fixed top-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 z-50"
                onClick={toggleSidebar}
            >
                <FaBars size={20} />
            </button>

            {/* Sidebar (Categories) */}
            <div
                className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out w-64`}
            >
                <CategoryList />
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <TopBar />
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Welcome to E-Cart</h1>
                    <p className="mt-2 text-gray-700">Browse our categories using the sidebar.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
