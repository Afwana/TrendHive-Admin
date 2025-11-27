import { Chip, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchSubCategoriesOfCategory,
} from "@/store/admin/category-slice";
import { fetchAllBrands } from "@/store/admin/brand-slice";
import { fetchAllProducts } from "@/store/admin/products-slice";

export default function CategoryDetails({ formData, setFormData }) {
  const dispatch = useDispatch();
  const { categoryList, subCategoryList } = useSelector(
    (state) => state.adminCategory
  );
  const { brandList } = useSelector((state) => state.adminBrand);
  const { productList } = useSelector((state) => state.adminProducts);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const categoryOptions =
    categoryList && categoryList.length > 0
      ? categoryList.map((category) => ({
          id: category?._id || "",
          label: category?.title || "",
        }))
      : [];

  const brandOptions =
    brandList && brandList.length > 0
      ? brandList.map((brand) => ({
          id: brand?._id || "",
          label: brand?.title || "",
        }))
      : [];

  const productOptions =
    productList && productList.length > 0
      ? productList.map((product) => ({
          id: product?._id || "",
          label: product?.title || "",
          image: product.thumbnail || "",
        }))
      : [];

  const subCategoryOptions =
    subCategoryList && subCategoryList.length > 0
      ? subCategoryList.map((subCategory) => ({
          id: subCategory?.id || "",
          label: subCategory?.title || "",
        }))
      : [];

  useEffect(() => {
    try {
      dispatch(fetchAllCategories());
      dispatch(fetchAllBrands());
      dispatch(fetchAllProducts());
      if (selectedCategoryId) {
        dispatch(fetchSubCategoriesOfCategory(selectedCategoryId));
      } else {
        setFormData((prev) => ({
          ...prev,
          subCategory: [],
        }));
      }
    } catch (error) {
      console.error("Failed to fetch categories or brands:", error);
    }
  }, [dispatch, selectedCategoryId, setFormData]);

  const handleSelectionChange = (field, selected) => {
    const value = Array.from(selected)[0];
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultiSelectionChange = (field, selected) => {
    const values = Array.from(selected);
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };
  console.log(categoryList, brandList, productList, subCategoryList);
  console.log(
    categoryOptions,
    brandOptions,
    productOptions,
    subCategoryOptions
  );
  console.log(formData);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Select
          id={"category"}
          label="Category"
          labelPlacement="outside"
          placeholder="Select a category"
          variant="bordered"
          isRequired
          selectedKeys={formData.category ? [formData.category] : []}
          onSelectionChange={(selected) => {
            setSelectedCategoryId(Array.from(selected)[0]);
            handleSelectionChange("category", selected);
          }}>
          {categoryOptions.map((category) => (
            <SelectItem key={category.id}>{category.label}</SelectItem>
          ))}
        </Select>
        <Select
          id={"brand"}
          label="Brand"
          labelPlacement="outside"
          placeholder="Select a brand"
          variant="bordered"
          isRequired
          selectedKeys={formData.brand ? [formData.brand] : []}
          onSelectionChange={(selected) =>
            handleSelectionChange("brand", selected)
          }>
          {brandOptions.map((brand) => (
            <SelectItem key={brand.id}>{brand.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Select
          id={"subCategory"}
          label="Sub Category"
          labelPlacement="outside"
          placeholder="Select a sub category"
          variant="bordered"
          selectionMode="multiple"
          isRequired
          selectedKeys={formData.subCategory}
          onSelectionChange={(selected) =>
            handleMultiSelectionChange("subCategory", selected)
          }>
          {subCategoryOptions.map((category) => (
            <SelectItem key={category.id}>{category.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-3">
        <Select
          id={"relatedProducts"}
          label="Related Products"
          labelPlacement="outside"
          placeholder="Select related products"
          variant="bordered"
          selectionMode="multiple"
          isRequired
          selectedKeys={formData.relatedProducts}
          onSelectionChange={(selected) =>
            handleMultiSelectionChange("relatedProducts", selected)
          }>
          {productOptions.map((product) => (
            <SelectItem key={product.id}>{product.label}</SelectItem>
          ))}
        </Select>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {formData.relatedProducts.length > 0 ? (
            formData.relatedProducts.map((key) => (
              <div
                key={key}
                className="relative w-[150px] h-[150px] rounded-lg overflow-hidden border">
                <img
                  src={productOptions.find((item) => item.id === key)?.image}
                  alt={
                    productOptions.find((item) => item.id === key)?.label ||
                    "Related Product"
                  }
                  className="w-full h-full object-cover"
                />
                <p className="border p-2 absolute z-40 text-xs fond-semibold bottom-0 left-0 right-0 opacity-70 bg-white text-center m-1">
                  {productOptions.find((item) => item.id === key)?.label || key}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-4">
              No related products selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
