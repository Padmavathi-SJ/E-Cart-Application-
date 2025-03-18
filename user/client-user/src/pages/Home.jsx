import { FaBars } from "react-icons/fa";
import TopBar from "../Components/TopBar";
import CategoryList from "../Components/CategoryList";
import CategoryHelper from "../utils/CategoryHelper";
import SliderBanner from "../Components/SliderBanner";

function Home() {
    const { sidebarOpen, toggleSidebar } = CategoryHelper();

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
            <div className="flex-1 flex flex-col items-center">
                {/* Top Bar */}
                <TopBar />

                {/* Slider Banner - Centered Below TopBar */}
                <div className="w-full max-w-screen-xl mt-6">
                    <SliderBanner />
                </div>

                
            </div>
        </div>
    );
}

export default Home;
