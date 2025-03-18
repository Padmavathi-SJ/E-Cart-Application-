// src/components/AllCategory.jsx
import AddCategory from "../utils/AddCategory";
import ViewCategories from "../utils/ViewCategories";

const AllCategory = () => {
    return (
        <div className="p-4">
            <AddCategory onCategoryAdded={() => window.location.reload()} />
            <ViewCategories />
        </div>
    );
};

export default AllCategory;
