import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Auth from "../Components/Auth";

function Home() {
    const [showAuth, setShowAuth] = useState(false);

    return (
        <div>
            <h1>Welcome to E-Cart</h1>
            <FaUserCircle size={30} onClick={() => setShowAuth(!showAuth)} style={{ cursor: "pointer" }} />
            {showAuth && <Auth />}
        </div>
    );
}

export default Home;
