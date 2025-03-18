import TopBar from "../Components/TopBar";
import Sidebar from "../Components/Sidebar";

const Home = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <TopBar />
                <h2 className="text-center mt-10 text-2xl">Welcome to Admin Dashboard</h2>
            </div>
        </div>
    );
};

export default Home;
