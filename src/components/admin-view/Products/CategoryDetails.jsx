import { Chip, Select, SelectItem } from "@heroui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "@/store/admin/category-slice";
import { fetchAllBrands } from "@/store/admin/brand-slice";
import { fetchAllProducts } from "@/store/admin/products-slice";

export default function CategoryDetails({ formData, setFormData }) {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.adminCategory);
  const { brandList } = useSelector((state) => state.adminBrand);
  const { productList } = useSelector((state) => state.adminProducts);

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

  useEffect(() => {
    try {
      dispatch(fetchAllCategories());
      dispatch(fetchAllBrands());
      dispatch(fetchAllProducts());
    } catch (error) {
      console.error("Failed to fetch categories or brands:", error);
    }
  }, [dispatch]);

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
  console.log(categoryList, brandList, productList);

  console.log(categoryOptions, brandOptions, productOptions);

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
          onSelectionChange={(selected) =>
            handleSelectionChange("category", selected)
          }>
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
          {categoryOptions.map((category) => (
            <SelectItem key={category.id}>{category.label}</SelectItem>
          ))}
        </Select>
        <div className="flex items-center justify-start gap-3 text-sm">
          Selected:{" "}
          {formData.subCategory.length > 0
            ? formData.subCategory
                .map((key) => {
                  const category = categoryOptions.find(
                    (cat) => cat.key === key
                  );
                  return category;
                  // <Chip radius="sm" color="secondary">
                  //   {category?.label}
                  // </Chip>
                })
                .filter(Boolean)
                .join(", ")
            : "None"}
        </div>
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
          selectedKeys={formData.subCategory}
          onSelectionChange={(selected) =>
            handleMultiSelectionChange("subCategory", selected)
          }>
          {productOptions.map((product) => (
            <SelectItem key={product.id}>{product.title}</SelectItem>
          ))}
        </Select>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {formData.relatedProducts.length > 0 ? (
            formData.relatedProducts.map((key) => (
              <div key={key} className="p-2 border rounded text-center text-sm">
                {productOptions.find((item) => item.key === key)?.title || key}
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
