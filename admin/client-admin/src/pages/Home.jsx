import { useState, useEffect } from "react";
import TopBar from "../Components/TopBar";
import Sidebar from "../Components/Sidebar";


const Home = () => {
    const [selectedSubId, setSelectedSubId] = useState(null);

    useEffect(() => {
        console.log("Updated selectedSubId:", selectedSubId);
    }, [selectedSubId]);
    
    return (
        <div className="flex">
            <Sidebar/>
            <div className="w-full">
                <TopBar />
            </div>
        </div>
    );
};

export default Home;
