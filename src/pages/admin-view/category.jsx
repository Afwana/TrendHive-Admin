import AdminCategoryTile from "@/components/admin-view/category-tile";
import ImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addCategoryFormElements } from "@/config";
import {
  addNewCategory,
  deleteCategory,
  editCategory,
  fetchAllCategories,
} from "@/store/admin/category-slice";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Plus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
};

function AdminCategory() {
  const [openCreateCategoriesDialog, setOpenCreateCategoriesDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { categoryList } = useSelector((state) => state.adminCategory);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editCategory({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllCategories());
            setFormData(initialFormData);
            setOpenCreateCategoriesDialog(false);
            setCurrentEditedId(null);
            toast.success("Category edited successfully");
          }
        })
      : dispatch(
          addNewCategory({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllCategories());
            setImageFile(null);
            setFormData(initialFormData);
            setOpenCreateCategoriesDialog(false);
            toast.success("Category added successfully");
          }
        });
  }

  function handleDelete(getCurrentCategoryId) {
    dispatch(deleteCategory(getCurrentCategoryId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllCategories());
      }
    });
  }

  function isFormValid() {
    const requiredFields = ["title"];

    return requiredFields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-5 w-full flex justify-between">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button
          onPress={() => setOpenCreateCategoriesDialog(true)}
          color="primary">
          Add New Category
        </Button>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {categoryList && categoryList.length > 0
          ? categoryList.map((categoryItem, index) => (
              <Card
                isBlurred
                key={index}
                className="max-[325px]:w-[290px] min-[375px]:w-[340px] min-[425px]:w-[390px] md:w-full">
                <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <h1 className="text-lg font-medium">
                      {categoryItem?.title}
                    </h1>
                    <Button isIconOnly color="primary">
                      <Plus size={18} color="white" />
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="overflow-x-auto">
                    <div className="flex gap-4 pb-2 min-w-max">
                      {categoryList && categoryList.length > 0
                        ? categoryList.map((categoryItem, index) => (
                            <div key={index} className="flex-shrink-0 w-40">
                              <AdminCategoryTile
                                setFormData={setFormData}
                                setOpenCreateProductsDialog={
                                  setOpenCreateCategoriesDialog
                                }
                                setCurrentEditedId={setCurrentEditedId}
                                category={categoryItem}
                                handleDelete={handleDelete}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          : null}
      </div>
      <Sheet
        open={openCreateCategoriesDialog}
        onOpenChange={() => {
          setOpenCreateCategoriesDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Category" : "Add New Category"}
            </SheetTitle>
          </SheetHeader>
          <div className="px-5">
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                formControls={addCategoryFormElements}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminCategory;
