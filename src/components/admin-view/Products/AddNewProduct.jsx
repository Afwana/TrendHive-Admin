import { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AnimatedStepper from "./AnimatedStepper";
import BasicInfo from "./BasicInfo";
import CategoryDetails from "./CategoryDetails";
import ImagesUpload from "./ImagesUpload";
import { useDispatch } from "react-redux";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { toast } from "sonner";

const initialFormData = {
  thumbnail: null,
  images: [],
  title: "",
  description: "",
  category: "",
  subCategory: [],
  brand: "",
  relatedProducts: [],
  size: "",
  colours: "",
  quality: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

export default function AddNewProduct({
  isOpen,
  onOpenChange,
  currentEditedId,
  setCurrentEditedId,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [additionalProductImages, setAdditionalProductImages] = useState([]);
  const dispatch = useDispatch();

  const lowercaseFormData = {
    ...formData,
    size: formData?.size?.toLowerCase(),
    colours: formData?.colours?.toLowerCase(),
  };

  function onSubmit(event) {
    // event.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!uploadedImageUrl) {
      toast.error("Please upload a thumbnail image");
      return;
    }

    const productData = {
      ...lowercaseFormData,
      thumbnail: uploadedImageUrl,
      images: additionalProductImages,
    };

    console.log(productData);

    // currentEditedId !== null
    //   ? dispatch(
    //       editProduct({
    //         id: currentEditedId,
    //         formData: productData,
    //       })
    //     ).then((data) => {
    //       if (data?.payload?.success) {
    //         dispatch(fetchAllProducts());
    //         setFormData(initialFormData);
    //         setUploadedImageUrl("");
    //         setAdditionalProductImages([]);
    //         setImageFile(null);
    //         setCurrentEditedId(null);
    //         onOpenChange(false);
    //         toast.success("Product updated successfully");
    //       }
    //     })
    //   : dispatch(addNewProduct(productData)).then((data) => {
    //       if (data?.payload?.success) {
    //         dispatch(fetchAllProducts());
    //         setImageFile(null);
    //         setFormData(initialFormData);
    //         toast.success("Product added successfully");
    //         setAdditionalProductImages([]);
    //         setUploadedImageUrl("");
    //         onOpenChange(false);
    //       }
    //     });
  }

  const handleAdditionalImagesUpdate = (imageUrls) => {
    setAdditionalProductImages(imageUrls);
  };

  function isFormValid() {
    const requiredFields = [
      "title",
      "description",
      "category",
      "subCategory",
      "brand",
      "size",
      "colours",
      "price",
      "totalStock",
    ];

    return requiredFields.every((field) => {
      const value = formData[field];
      return value !== "" && value !== null && value !== undefined;
    });
  }

  const steps = [
    {
      number: 1,
      component: <BasicInfo formData={formData} setFormData={setFormData} />,
      key: "basicInfo",
    },
    {
      number: 2,
      component: (
        <CategoryDetails formData={formData} setFormData={setFormData} />
      ),
      key: "categoryDetails",
    },
    {
      number: 3,
      component: (
        <ImagesUpload
          handleImages={handleAdditionalImagesUpdate}
          thumbnail={imageFile}
          setThumbnail={setImageFile}
          thumbnailUrl={uploadedImageUrl}
          setThumbnailUrl={setUploadedImageUrl}
          imageLoading={imageLoadingState}
          setImageLoading={setImageLoadingState}
          currentImages={additionalProductImages}
        />
      ),
      key: "Images",
    },
  ];

  const handleNext = async () => {
    if (currentStep === 1) {
      if (
        !formData.title ||
        !formData.description ||
        !formData.size ||
        !formData.colours ||
        !formData.price ||
        !formData.totalStock
      ) {
        toast.error("Please fill all required fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.category || !formData.subCategory || !formData.brand) {
        toast.error("Please select category, sub category and brand");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setUploadedImageUrl("");
    setAdditionalProductImages([]);
    setImageFile(null);
    setCurrentStep(1);
    setCurrentEditedId(null);
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="max-w-4xl"
      scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center justify-center gap-2">
                <AnimatedStepper
                  steps={steps}
                  currentStep={currentStep}
                  onStepClick={handleStepClick}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center justify-between">
              {currentStep === 1 ? (
                <Button color="danger" variant="light" onPress={handleClose}>
                  Cancel
                </Button>
              ) : (
                <Button
                  color="primary"
                  startContent={<ArrowLeft size={16} />}
                  onPress={handlePrev}>
                  Back
                </Button>
              )}
              {currentStep === steps.length ? (
                <Button
                  color="primary"
                  isDisabled={!isFormValid() || !uploadedImageUrl}
                  onPress={onSubmit}>
                  {currentEditedId !== null ? "Update Product" : "Add Product"}
                </Button>
              ) : (
                <Button
                  color="primary"
                  endContent={<ArrowRight size={16} />}
                  onPress={handleNext}>
                  Next
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
