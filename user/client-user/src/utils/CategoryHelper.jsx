import { useState } from "react";

const CategoryHelper = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return { sidebarOpen, toggleSidebar };
};

export default CategoryHelper;
