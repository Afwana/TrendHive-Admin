import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useNavigate } from "react-router-dom";

function AdminProductTile({ product, handleEdit, handleDelete }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <Card
        className="w-full max-w-sm mx-auto pt-0 cursor-pointer"
        onClick={() => navigate(`/admin/products/${product?._id}`)}
      >
        <div>
          <div className="relative">
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          </div>
          <CardContent>
            <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                &#8377; {product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-bold">
                  &#8377; {product?.salePrice}
                </span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button onPress={() => handleEdit(product)} color="secondary">
              Edit
            </Button>
            <Button onPress={onOpen} color="danger">
              Delete
            </Button>
          </CardFooter>
        </div>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg font-bold">
                Delete Product
              </ModalHeader>
              <ModalBody className="text-base">
                Are you sure? You want to remove this product.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleDelete(product?._id);
                    onOpenChange();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminProductTile;
