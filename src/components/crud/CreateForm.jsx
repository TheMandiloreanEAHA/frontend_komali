import { useContext } from "react";
import { crudContext } from "../../pages/Admin";
import AdminForm from "../crud/AdminForm";
import ProductForm from "./ProductForm";

const CreateForm = () => {
  const { category } = useContext(crudContext);
  const [selectedCategory, setSelectedCategory] = category;

  const renderCreateFormByCategory = () => {
    switch (selectedCategory) {
      case "admin":
        return <AdminForm />;
      case "comedores":
        return <div>Tilin</div>;
      case "productos":
        return <ProductForm />;
      case "empleados":
        return <div>Tilin</div>;
      default:
        return <div>Tilin</div>;
    }
  };

  return <>{renderCreateFormByCategory()}</>;
};

export default CreateForm;
