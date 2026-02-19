import ImageUpload from "../image-upload";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@heroui/react";

export default function ImagesUpload({
  handleImages,
  thumbnail,
  setThumbnail,
  thumbnailUrl,
  setThumbnailUrl,
  imageLoading,
  setImageLoading,
  currentImages,
}) {
  const [additionalImages, setAdditionalImages] = useState([]);

  const [isUploading, setIsUploading] = useState(false);

  const baseUrl = "https://trendhive-server.onrender.com";

  useEffect(() => {
    setAdditionalImages(currentImages || []);
  }, [currentImages]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("my_file", file);
      const response = await axios.post(
        `${baseUrl}/api/admin/products/upload-image`,
        data,
      );
      const imageUrl = response?.data?.result?.url;

      if (imageUrl) {
        const updatedImages = [...additionalImages, imageUrl];
        setAdditionalImages(updatedImages);
        handleImages(updatedImages);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = additionalImages.filter(
      (_, index) => index !== indexToRemove,
    );
    setAdditionalImages(updatedImages);
    handleImages(updatedImages);
  };

  useEffect(() => {
    setAdditionalImages(currentImages);
  }, [currentImages]);
  return (
    <div className="flex flex-col gap-3">
      <ImageUpload
        imageFile={thumbnail}
        setImageFile={setThumbnail}
        uploadedImageUrl={thumbnailUrl}
        setUploadedImageUrl={setThumbnailUrl}
        setImageLoadingState={setImageLoading}
        imageLoadingState={imageLoading}
      />

      <h2 className="text-lg font-semibold">Add More Product Images</h2>
      <div className="">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              ) : (
                <>
                  <ImagePlus className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="text-sm text-gray-500">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          {additionalImages.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Additional ${index + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-500 border-red-500 z-10 border-2 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
