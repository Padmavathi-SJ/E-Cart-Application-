import { useState, useEffect } from "react";
import TopBar from "../Components/TopBar";
import Sidebar from "../Components/Sidebar";
import ManageProduct from "../Components/ManageProduct";

const Home = () => {
    const [selectedSubId, setSelectedSubId] = useState(null);

    useEffect(() => {
        console.log("Updated selectedSubId:", selectedSubId);
    }, [selectedSubId]);
    
    return (
        <div className="flex">
            <Sidebar setSelectedSubId={setSelectedSubId} />
            <div className="w-full">
                <TopBar />
            <div className="flex-1 p-4">
                {selectedSubId ? <ManageProduct sub_id={selectedSubId} /> : <p>Select a subcategory to manage products.</p>}
            </div>
            </div>
        </div>
    );
};

export default Home;
