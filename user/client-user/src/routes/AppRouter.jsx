import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ItemsDisplay from '../Components/ItemsDisplay';
import ProductItemsDisplay from '../Components/ProductItemsDisplay'; // Import the ItemsDisplay component

function AppRouter() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/subcategories/:sub_id/items" element={<ItemsDisplay />} /> 
                <Route path="/subProductCategories/:sub_p_id/product-items" element={<ProductItemsDisplay />} />
            </Routes>
        
    );
}

export default AppRouter;
