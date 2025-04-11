import { FaBars } from "react-icons/fa";
import TopBar from "../Components/TopBar";
import CategoryHelper from "../utils/CategoryHelper";
import SliderBanner from "../Components/SliderBanner";
import ProductCategoryList from '../Components/ProductCategoriesList';

function Home() {
    const { sidebarOpen, toggleSidebar } = CategoryHelper();

    return (
        <div className="min-h-screen bg-gray-100 relative overflow-hidden">
            


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
