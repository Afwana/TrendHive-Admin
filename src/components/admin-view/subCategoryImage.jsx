import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

function SubCategoryImage({
  uploadId,
  imageFile,
  setImageFile,
  imageLoadingState,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);
  const baseUrl = "https://trendhive-server.onrender.com";

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        toast.error("Only JPG, JPEG, and PNG files are allowed.");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds 2 MB limit.");
        return;
      }

      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (!ALLOWED_FILE_TYPES.includes(droppedFile.type)) {
      toast.error("Only JPG, JPEG, and PNG files are allowed.");
      return;
    }

    if (droppedFile) {
      if (droppedFile.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds 2 MB limit.");
        return;
      }

      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${baseUrl}/api/admin/products/upload-image`,
      data,
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="flex flex-col gap-2 w-2/6">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg`}
      >
        <Input
          id={`sub-category-image-upload-${uploadId}`}
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor={`sub-category-image-upload-${uploadId}`}
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center cursor-pointer py-2.5`}
          >
            <UploadCloudIcon className="w-6 h-6 text-muted-foreground my-2 text-xs" />
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-5 bg-gray-100" />
        ) : (
          <div className="flex items-start justify-between py-2">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded"
              className="h-20 w-20 object-contain rounded-md"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-2 h-2" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubCategoryImage;
