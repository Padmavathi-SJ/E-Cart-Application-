import { FaBars } from "react-icons/fa";
import TopBar from "../Components/TopBar";
import CategoryList from "../Components/CategoryList";
import CategoryHelper from "../utils/CategoryHelper";
import SliderBanner from "../Components/SliderBanner";
import ProductCategoryList from '../Components/ProductCategoriesList';

function Home() {
    const { sidebarOpen, toggleSidebar } = CategoryHelper();

    return (
        <div className="min-h-screen bg-gray-100 relative overflow-hidden">
            {/* Sidebar Toggle Button */}
            <button
                className="fixed top-20 left-4 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 z-50"
                onClick={toggleSidebar}
            >
                <FaBars size={20} />
            </button>

            {/* Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex">
                    <div className="w-64 bg-white shadow-lg h-full">
                        <CategoryList />
                    </div>
                    <div
                        className="flex-1 bg-black bg-opacity-40"
                        onClick={toggleSidebar}
                    />
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10">
                <TopBar />

                {/* Main Body */}
                <div className="max-w-screen-xl mx-auto px-4">
                    {/* Slider */}
                    <div className="mt-6">
                        <SliderBanner />
                    </div>

                    {/* Product Categories */}
                    <div className="mt-8">
                        <ProductCategoryList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
