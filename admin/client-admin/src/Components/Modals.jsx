import AddCategory from "../utils/AddCategory";
import AddSubcategory from "../utils/AddSubcategory";
import { AddProduct, AddSubProduct } from "../utils/ProductHelper";

const Modals = ({ showAddCategory, setShowAddCategory, showAddSubcategory, setShowAddSubcategory, selectedCategoryId, showAddProduct, setShowAddProduct, showAddSubProduct, setShowAddSubProduct, selectedProductCategoryId }) => {
    return (
        <>
            {showAddCategory && <AddCategory onClose={() => setShowAddCategory(false)} />}
            {showAddSubcategory && <AddSubcategory categoryId={selectedCategoryId} onClose={() => setShowAddSubcategory(false)} />}
            {showAddProduct && <AddProduct onClose={() => setShowAddProduct(false)} />}
            {showAddSubProduct && <AddSubProduct onClose={() => setShowAddSubProduct(false)} />}
        </>
    );
};

export default Modals;
