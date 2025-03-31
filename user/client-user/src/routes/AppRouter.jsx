import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ItemsDisplay from '../Components/ItemsDisplay'; // Import the ItemsDisplay component

function AppRouter() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/subcategories/:sub_id/items" element={<ItemsDisplay />} /> 
            </Routes>
        
    );
}

export default AppRouter;
