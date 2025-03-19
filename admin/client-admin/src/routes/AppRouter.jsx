import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../Components/Auth";

const AppRouter = () => {
    return (
       
            <Routes>
                <Route path="/*" element={<Home />} />  {/* ✅ Fix for nested routing */}
                <Route path="/login" element={<Auth />} />
            </Routes>
        
    );
};

export default AppRouter;
