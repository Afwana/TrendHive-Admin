import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";

function AdminCategoryTile({
  category,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <img
        src={category?.image}
        alt={category?.title}
        className="w-[150px] h-[150px] object-cover rounded-lg"
      />
      <div className="flex items-center justify-center gap-1 w-full">
        <h2 className="text-xl font-bold mb-2 mt-2">{category?.title}</h2>
        <div className="flex justify-between items-center">
          <Button
            onPress={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(category?._id);
              setFormData(category);
            }}
            isIconOnly
            variant="light">
            <EditIcon size={16} />
          </Button>
          <Button
            onPress={() => handleDelete(category?._id)}
            isIconOnly
            variant="light">
            <Trash2 size={16} color="red" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminCategoryTile;
