import { Routes, Route } from "react-router-dom";
import TopBar from "../Components/TopBar";
import Sidebar from "../Components/Sidebar";
import ManageProduct from "../Components/ManageProduct";

const Home = () => {
    return (
        <div className="flex">
            <Sidebar />  
            <div className="w-full">
                <TopBar />
                <div className="p-6">
                    <Routes>
                        <Route path="/" element={<h2 className="text-center mt-10 text-2xl">Welcome to Admin Dashboard</h2>} />
                        <Route path="manage-products/:sub_id" element={<ManageProduct />} /> 
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Home;
