import { Input, Textarea } from "@heroui/react";

export default function BasicInfo({ formData, setFormData }) {
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="flex flex-col gap-3">
      <Input
        id={"title"}
        label="Product Name"
        labelPlacement="outside"
        placeholder="Enter product name"
        variant="bordered"
        isRequired
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <Textarea
        id={"description"}
        label="Description"
        labelPlacement="outside"
        placeholder="Enter product description"
        variant="bordered"
        size="lg"
        maxRows={7}
        isRequired
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          id={"size"}
          label="Available Size"
          labelPlacement="outside"
          placeholder="Enter available product size"
          variant="bordered"
          isRequired
          value={formData.size}
          onChange={(e) => handleInputChange("size", e.target.value)}
        />
        <Input
          id={"colours"}
          label="Available Colours"
          labelPlacement="outside"
          placeholder="Enter available colours"
          variant="bordered"
          isRequired
          value={formData.colours}
          onChange={(e) => handleInputChange("colours", e.target.value)}
        />
        <Input
          id={"quality"}
          label="Quality"
          labelPlacement="outside"
          placeholder="Enter product quality"
          variant="bordered"
          value={formData.quality}
          onChange={(e) => handleInputChange("quality", e.target.value)}
        />
        <Input
          id={"totalStock"}
          label="Stock"
          labelPlacement="outside"
          placeholder="Enter total stock"
          variant="bordered"
          isRequired
          value={formData.totalStock}
          onChange={(e) => handleInputChange("totalStock", e.target.value)}
        />
        <Input
          id={"price"}
          label="Price"
          labelPlacement="outside"
          placeholder="Enter price"
          variant="bordered"
          isRequired
          value={formData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
        />
        <Input
          id={"salePrice"}
          label="Sale Price"
          labelPlacement="outside"
          placeholder="Enter sale price"
          variant="bordered"
          value={formData.salePrice}
          onChange={(e) => handleInputChange("salePrice", e.target.value)}
        />
      </div>
    </div>
  );
}
