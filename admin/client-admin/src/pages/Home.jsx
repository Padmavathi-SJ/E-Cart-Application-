import { useState } from "react";
import TopBar from "../Components/TopBar";
import Sidebar from "../Components/Sidebar";
import AddItem from "../Components/AddItem";

const Home = () => {
    const [activeSection, setActiveSection] = useState(null);

    return (
        <div className="flex">
            <Sidebar setActiveSection={setActiveSection} />
            <div className="w-full">
                <TopBar />
                <div className="p-4">
                    {activeSection === "addItem" && <AddItem />}
                </div>
            </div>
        </div>
    );
};

export default Home;
