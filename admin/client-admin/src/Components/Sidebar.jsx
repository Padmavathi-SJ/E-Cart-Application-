import { useState } from "react";
import { PlusCircle } from "lucide-react";
import CategoriesSection from "./Categories";
import ProductCategoriesSection from "./ProductCategories";
import Modals from "./Modals";

const Sidebar = ({setActiveSection}) => {
    const [showCategories, setShowCategories] = useState(false);
    const [showProductCategories, setShowProductCategories] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddSubcategory, setShowAddSubcategory] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddSubProduct, setShowAddSubProduct] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedProductCategoryId, setSelectedProductCategoryId] = useState(null);
    const [expandedCategoryId, setExpandedCategoryId] = useState(null);

    // Toggle categories list
    const toggleCategories = () => {
        setShowCategories(!showCategories);
        setExpandedCategoryId(null); // Close dropdowns when opening main categories
    };

    // Toggle product categories list
    const toggleProductCategories = () => {
        setShowProductCategories(!showProductCategories);
        setExpandedCategoryId(null); // Close dropdowns when opening product categories
    };

    return (
        <div className="relative flex">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-white text-gray-800 h-screen p-4 shadow-md">
                <nav className="space-y-3">
                    {/* Categories */}
                    <div className="flex items-center justify-between">
                        <p className="cursor-pointer hover:text-blue-600" onClick={toggleCategories}>
                            All Categories
                        </p>
                        <button className="text-green-600 hover:text-green-800" onClick={() => setShowAddCategory(true)}>
                            <PlusCircle size={20} />
                        </button>
                    </div>

                    {/* Categories Section */}
                    {showCategories && (
                        <CategoriesSection
                            setShowAddSubcategory={setShowAddSubcategory}
                            setSelectedCategoryId={setSelectedCategoryId}
                        />
                    )}

                    {/* Product Categories */}
                    <div className="flex items-center justify-between">
                        <p className="cursor-pointer hover:text-blue-600" onClick={toggleProductCategories}>
                            Product Categories
                        </p>
                        <button className="text-green-600 hover:text-green-800" onClick={() => setShowAddProduct(true)}>
                            <PlusCircle size={20} />
                        </button>
                    </div>

                    {/* Product Categories Section */}
                    {showProductCategories && (
                        <ProductCategoriesSection
                            setShowAddSubProduct={setShowAddSubProduct}
                            setSelectedProductCategoryId={setSelectedProductCategoryId}
                        />
                    )}
                    
                    <p className="cursor-pointer hover:text-blue-600" onClick={() => setActiveSection("addItem")}>
                        Add Category Item
                    </p>
                    <p className="cursor-pointer hover:text-blue-600" onClick={() => setActiveSection("addProductItem")}>
                        Add Product Item
                    </p>

                </nav>
            </div>

            {/* Modals */}
            <Modals 
                showAddCategory={showAddCategory} setShowAddCategory={setShowAddCategory}
                showAddSubcategory={showAddSubcategory} setShowAddSubcategory={setShowAddSubcategory} selectedCategoryId={selectedCategoryId}
                showAddProduct={showAddProduct} setShowAddProduct={setShowAddProduct}
                showAddSubProduct={showAddSubProduct} setShowAddSubProduct={setShowAddSubProduct} selectedProductCategoryId={selectedProductCategoryId}
            />
        </div>
    );
};

export default Sidebar;
