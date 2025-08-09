import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  const handleMultiSelectChange = (name, value) => {
    const currentValues = Array.isArray(formData[name]) ? formData[name] : [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    setFormData({
      ...formData,
      [name]: newValues,
    });
  };

  const removeSelectedItem = (name, valueToRemove) => {
    setFormData({
      ...formData,
      [name]: formData[name].filter((v) => v !== valueToRemove),
    });
  };

  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value =
      formData[getControlItem.name] || (getControlItem.multiple ? [] : "");

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        if (getControlItem.multiple) {
          element = (
            <div className="">
              <Select
                onValueChange={(selectedValue) => {
                  handleMultiSelectChange(getControlItem.name, selectedValue);
                }}
                value="">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${getControlItem.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {getControlItem.options?.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2">
                {Array.isArray(value) &&
                  value.map((selectedValue) => {
                    const selectedOption = getControlItem.options?.find(
                      (opt) => opt.id === selectedValue
                    );
                    return (
                      <Badge
                        key={selectedValue}
                        className="flex items-center gap-1">
                        {selectedOption?.label}
                        <button
                          type="button"
                          onClick={() =>
                            removeSelectedItem(
                              getControlItem.name,
                              selectedValue
                            )
                          }
                          className="ml-1 rounded-full">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
              </div>
            </div>
          );
        } else {
          element = (
            <Select
              onValueChange={(selectedValue) => {
                setFormData({
                  ...formData,
                  [getControlItem.name]: selectedValue,
                });
              }}
              value={value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={getControlItem.label} />
              </SelectTrigger>
              <SelectContent>
                {getControlItem.options?.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
