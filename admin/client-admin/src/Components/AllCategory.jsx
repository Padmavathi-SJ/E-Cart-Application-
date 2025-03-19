import { useEffect, useState } from "react";
import AddCategory from "../utils/AddCategory";
import ViewCategories from "../utils/ViewCategories";
import ViewSubcategories from "../utils/ViewSubcategories";

const AllCategory = () => {
    return (
        <div className="p-4">
            <AddCategory onCategoryAdded={() => window.location.reload()} />
            <ViewCategories />
            <ViewSubcategories />
        </div>
    );
};

export default AllCategory;