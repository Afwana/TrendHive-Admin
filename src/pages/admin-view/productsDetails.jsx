import NavigationSwiper from "@/components/admin-view/Products/NavigationSwiper";
import { fetchAllBrands } from "@/store/admin/brand-slice";
import { fetchAllCategories } from "@/store/admin/category-slice";
import { getProductsById } from "@/store/admin/products-slice";
import { Button, Chip } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AdminProductsDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productDetails, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const { categoryList } = useSelector((state) => state.adminCategory);
  const { brandList } = useSelector((state) => state.adminBrand);

  const [selectedImage, setSelectedImage] = useState("");
  const [productCategory, setProductCategory] = useState(null);
  const [productBrand, setProductBrand] = useState(null);
  const [sizeArray, setSizeArray] = useState([]);

  console.log(productDetails);

  useEffect(() => {
    dispatch(getProductsById(id));
    dispatch(fetchAllCategories());
    dispatch(fetchAllBrands());
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetails?.thumbnail) {
      setSelectedImage(productDetails?.thumbnail);
    }
  }, [productDetails]);

  useEffect(() => {
    if (productDetails?.category && categoryList.length > 0) {
      const foundCategory = categoryList.find(
        (cat) => cat._id === productDetails.category
      );
      setProductCategory(foundCategory);
    }
  }, [productDetails, categoryList]);

  useEffect(() => {
    if (productDetails?.brand && brandList.length > 0) {
      const foundBrand = brandList.find(
        (brand) => brand._id === productDetails.brand
      );
      setProductBrand(foundBrand);
    }
  }, [productDetails, brandList]);

  useEffect(() => {
    if (productDetails?.sizes) {
      // Check if sizes is already an array
      if (Array.isArray(productDetails.sizes)) {
        setSizeArray(productDetails.sizes);
      } else if (typeof productDetails.sizes === "string") {
        // Split by comma and trim whitespace
        const sizes = productDetails.sizes
          .split(",")
          .map((size) => size.trim())
          .filter((size) => size !== ""); // Remove empty strings
        setSizeArray(sizes);
      } else {
        setSizeArray([]);
      }
    } else {
      setSizeArray([]);
    }
  }, [productDetails]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-5">
          <h2 className="text-2xl font-bold text-primary">
            {productDetails?.title}
          </h2>
          <Chip color="primary" size="lg" className="text-xl font-bold">
            {productDetails?.totalStock}
          </Chip>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* images swipe */}
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
          <div className="flex flex-col gap-5">
            {/* price details */}
            <div className="flex items-center justify-between gap-5">
              <Button color="danger" size="lg" className="w-full">
                &#8377;
                <span className="line-through">{`${productDetails?.price}`}</span>
              </Button>
              <Button color="success" size="lg" className="w-full">
                &#8377;<span>{`${productDetails?.salePrice}`}</span>
              </Button>
            </div>
            {/* description */}
            <p className="flex text-base md:text-lg font-medium text-justify">
              {productDetails?.description}
            </p>
            {/* category & brand */}
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center justify-start gap-2">
                <div className="w-10 h-10 rounded-full border-1 border-green-300 overflow-hidden">
                  <img
                    src={productCategory?.image || "/placeholder.jpg"}
                    alt={productCategory?.title || "Category"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg font-semibold">
                  {productCategory?.title}
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="w-10 h-10 rounded-full border-1 border-green-300 overflow-hidden">
                  <img
                    src={productBrand?.image || "/placeholder.jpg"}
                    alt={productBrand?.title || "Category"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg font-semibold">{productBrand?.title}</p>
              </div>
            </div>
            {/* product sizes */}
            <div className="flex items-center justify-start gap-5">
              {productDetails?.sizes?.map((size, imdex) => (
                <Chip key={imdex} color="primary" size="md">
                  {size}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
