import AdminCategoryTile from "@/components/admin-view/category-tile";
import ImageUpload from "@/components/admin-view/image-upload";
import SubCategoryImage from "@/components/admin-view/subCategoryImage";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  addNewCategory,
  deleteCategory,
  editCategory,
  fetchAllCategories,
} from "@/store/admin/category-slice";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { EditIcon, PlusSquare, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  subCategories: [{ id: 1, title: "", image: null }],
};

function AdminCategory() {
  const [openCreateCategoriesDialog, setOpenCreateCategoriesDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [subCategoryImages, setSubCategoryImages] = useState({});

  const { categoryList } = useSelector((state) => state.adminCategory);
  const dispatch = useDispatch();

  const addSubCategory = () => {
    setFormData((prev) => {
      const nextId = prev.subCategories.length + 1;
      return {
        ...prev,
        subCategories: [
          ...prev.subCategories,
          { id: nextId, title: "", image: null },
        ],
      };
    });
  };

  const removeSubCategory = (index) => {
    if (formData.subCategories.length > 1) {
      setFormData((prev) => ({
        ...prev,
        subCategories: prev.subCategories.filter((_, i) => i !== index),
      }));
    }
  };

  const updateSubCategoryTitle = (index, title) => {
    setFormData((prev) => ({
      ...prev,
      subCategories: prev.subCategories.map((subCat, i) =>
        i === index ? { ...subCat, title } : subCat,
      ),
    }));
  };

  const updateSubCategoryImageFile = (index, file) => {
    setSubCategoryImages((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        file,
      },
    }));
  };

  const updateSubCategoryImageUrl = (index, url) => {
    setSubCategoryImages((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        url,
      },
    }));
  };

  const updateSubCategoryImageLoading = (index, loading) => {
    setSubCategoryImages((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        loading,
      },
    }));
  };

  const handleEditCategory = (category) => {
    setCurrentEditedId(category._id);

    setFormData({
      image: category.image,
      title: category.title,
      subCategories:
        category.subCategories.length > 0
          ? category.subCategories.map((subCat, index) => ({
              id: index + 1,
              title: subCat.title,
              image: subCat.image,
            }))
          : [{ id: 1, title: "", image: null }],
    });
    setUploadedImageUrl(category.image || "");
    const subCategoryImagesData = {};
    category.subCategories.forEach((subCat, index) => {
      subCategoryImagesData[index] = {
        file: null,
        url: subCat.image || "",
        loading: false,
      };
    });
    setSubCategoryImages(subCategoryImagesData);

    setOpenCreateCategoriesDialog(true);
  };

  function onSubmit(event) {
    event.preventDefault();

    const subCategoriesWithImages = formData.subCategories.map(
      (subCat, index) => ({
        ...subCat,
        image: subCategoryImages[index]?.url || subCat.image || null,
      }),
    );

    const filteredSubCategories = subCategoriesWithImages.filter(
      (subCat) => subCat.title.trim() !== "" || subCat.image !== null,
    );

    const submitData = {
      ...formData,
      image: uploadedImageUrl,
      subCategories: filteredSubCategories,
    };

    currentEditedId !== null
      ? dispatch(
          editCategory({
            id: currentEditedId,
            formData: submitData,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllCategories());
            setFormData(initialFormData);
            setOpenCreateCategoriesDialog(false);
            setCurrentEditedId(null);
            setImageFile(null);
            setUploadedImageUrl("");
            setSubCategoryImages({});
            toast.success("Category edited successfully");
          }
        })
      : dispatch(addNewCategory(submitData)).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllCategories());
            setImageFile(null);
            setFormData(initialFormData);
            setOpenCreateCategoriesDialog(false);
            setSubCategoryImages({});
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
      (field) => formData[field] && formData[field].trim() !== "",
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
          color="primary"
        >
          Add New Category
        </Button>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {categoryList && categoryList.length > 0 ? (
          categoryList.map((categoryItem, index) => (
            <Card isBlurred key={index} className="">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-lg font-medium">{categoryItem?.title}</h1>
                  <Button
                    isIconOnly
                    color="primary"
                    onPress={() => handleEditCategory(categoryItem)}
                  >
                    <EditIcon size={18} color="white" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex gap-4 pb-2 overflow-x-auto w-full scrollbar-hide justify-start">
                  {categoryItem.subCategories.length > 0 ? (
                    categoryItem.subCategories.map((subCategory, index) => (
                      <AdminCategoryTile
                        key={index}
                        setFormData={setFormData}
                        setOpenCreateProductsDialog={
                          setOpenCreateCategoriesDialog
                        }
                        setCurrentEditedId={setCurrentEditedId}
                        category={subCategory}
                        handleDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center mt-5 text-red-400">
                      No sub categories found.
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center mt-5 text-red-400">
            No categories found.
          </div>
        )}
      </div>
      <Sheet
        open={openCreateCategoriesDialog}
        onOpenChange={(open) => {
          setOpenCreateCategoriesDialog(false);
          if (!open) {
            setCurrentEditedId(null);
            setFormData(initialFormData);
            setImageFile(null);
            setUploadedImageUrl("");
            setSubCategoryImages({});
          }
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Category" : "Add New Category"}
            </SheetTitle>
          </SheetHeader>
          <div className="px-5">
            <form onSubmit={onSubmit}>
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
                <Input
                  id={"title"}
                  label="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  isRequired
                  placeholder="Enter category title"
                  labelPlacement="outside"
                  variant="bordered"
                />
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-sm font-medium">Sub Categories</h1>
                    <Button
                      type="button"
                      onPress={addSubCategory}
                      isIconOnly
                      size="sm"
                      color="primary"
                    >
                      <PlusSquare size={18} />
                    </Button>
                  </div>

                  {formData.subCategories.map((subCategory, index) => (
                    <div
                      key={subCategory.id}
                      className="flex items-center gap-3 mb-4 p-3 border rounded-lg"
                    >
                      <SubCategoryImage
                        uploadId={index}
                        imageFile={subCategoryImages[index]?.file || null}
                        setImageFile={(file) =>
                          updateSubCategoryImageFile(index, file)
                        }
                        uploadedImageUrl={subCategoryImages[index]?.url || ""}
                        setUploadedImageUrl={(url) =>
                          updateSubCategoryImageUrl(index, url)
                        }
                        setImageLoadingState={(loading) =>
                          updateSubCategoryImageLoading(index, loading)
                        }
                        imageLoadingState={
                          subCategoryImages[index]?.loading || false
                        }
                        isEditMode={currentEditedId !== null}
                      />
                      <Input
                        labelPlacement="outside"
                        variant="bordered"
                        placeholder="Enter subcategory title"
                        value={subCategory.title}
                        onChange={(e) =>
                          updateSubCategoryTitle(index, e.target.value)
                        }
                        className="flex-1"
                      />

                      {formData.subCategories.length > 1 && (
                        <Button
                          type="button"
                          isIconOnly
                          size="sm"
                          color="danger"
                          onPress={() => removeSubCategory(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    color="primary"
                    isDisabled={!isFormValid()}
                    className="w-full"
                  >
                    {currentEditedId !== null
                      ? "Update Category"
                      : "Add Category"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminCategory;
