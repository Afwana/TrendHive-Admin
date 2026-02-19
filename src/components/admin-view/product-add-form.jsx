import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "@/store/admin/category-slice";
import { fetchAllBrands } from "@/store/admin/brand-slice";

export const useDynamicProductFormElements = () => {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.adminCategory);
  const { brandList } = useSelector((state) => state.adminBrand);

  const categoryOptions =
    categoryList && categoryList.length > 0
      ? categoryList.map((category) => ({
          id: category?.title?.toLowerCase().replace(/\s+/g, "-") || "",
          label: category?.title || "",
        }))
      : [];

  const brandOptions =
    brandList && brandList.length > 0
      ? brandList.map((category) => ({
          id: category?.title?.toLowerCase().replace(/\s+/g, "-") || "",
          label: category?.title || "",
        }))
      : [];
  useEffect(() => {
    try {
      dispatch(fetchAllCategories());
      dispatch(fetchAllBrands());
    } catch (error) {
      console.error("Failed to fetch categories or brands:", error);
    }
  }, [dispatch]);
  const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      multiple: true,
      options: categoryOptions.length
        ? categoryOptions
        : [{ label: "No categories listed yet!" }],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: brandOptions.length
        ? brandOptions
        : [{ label: "No brands listed yet!" }],
    },
    {
      label: "Size",
      name: "size",
      componentType: "input",
      type: "text",
      placeholder: "Enter product size",
    },
    {
      label: "Colours",
      name: "colours",
      componentType: "input",
      type: "text",
      placeholder: "Enter product available colours",
    },
    {
      label: "Quality",
      name: "quality",
      componentType: "input",
      type: "text",
      placeholder: "Enter product quality",
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

  return addProductFormElements;
};
