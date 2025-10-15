import AdminProductTile from "@/components/admin-view/product-tile";
import AddNewProduct from "@/components/admin-view/Products/AddNewProduct";
import { deleteProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Button, useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminProducts() {
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editProductData, setEditProductData] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const handleEdit = (product) => {
    setEditProductData(product);
    onOpen();
    setCurrentEditedId(product?._id);
  };

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="mb-5 w-full flex justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onPress={onOpen} color="primary">
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              <AdminProductTile
                key={index}
                product={productItem}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <AddNewProduct
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        currentEditedId={currentEditedId}
        editProductData={editProductData}
        setCurrentEditedId={setCurrentEditedId}
      />
    </>
  );
}

export default AdminProducts;
