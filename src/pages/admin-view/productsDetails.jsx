import NavigationSwiper from "@/components/admin-view/Products/NavigationSwiper";
import { getProductsById } from "@/store/admin/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AdminProductsDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productDetails, isLoading } = useSelector(
    (state) => state.adminProducts
  );

  const [selectedImage, setSelectedImage] = useState("");
  console.log(id, "Product id");
  console.log(productDetails, "Product Details");

  useEffect(() => {
    dispatch(getProductsById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetails?.thumbnail) {
      setSelectedImage(productDetails?.thumbnail);
    }
  }, [productDetails]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-primary">
          {productDetails?.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <div className="w-full">
              <img
                src={selectedImage ?? "/placeholder.jpeg"}
                alt={`Thumbnail of ${productDetails?.title}`}
                className="object-contain md:object-cover w-full md:h-[500px] rounded-lg"
              />
            </div>
            {productDetails?.images && (
              <NavigationSwiper
                thumbnail={productDetails?.thumbnail}
                images={productDetails?.images}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
