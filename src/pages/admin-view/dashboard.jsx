import KPIs from "@/components/admin-view/Dashboard/KPIs";
import ImageUpload from "@/components/admin-view/image-upload";
// import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/common-slice";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { orderList } = useSelector((state) => state.adminOrder);
  const navigate = useNavigate();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      } else {
        toast.error(
          data?.payload?.message || "Failed to upload, Limit 3 is reached."
        );
      }
    });
  }

  function handleDeleteImage(imageId) {
    dispatch(deleteFeatureImage(imageId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        toast.success("Banner deleted successfullly.");
      } else {
        toast.error("Failed to delete banner.");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-5">
      <KPIs />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card isBlurred className="p-3">
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling={true}
            // isEditMode={currentEditedId !== null}
          />
          <Button
            onPress={handleUploadFeatureImage}
            className="mt-5 w-full bg-primary">
            Upload
          </Button>
          <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {featureImageList && featureImageList.length > 0
              ? featureImageList.map((featureImgItem, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={featureImgItem.image}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleDeleteImage(featureImgItem._id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              : null}
          </CardBody>
        </Card>
        <Table
          topContent={
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">Recent Orders</h1>
              <Button
                variant="faded"
                className="bg-primary"
                onPress={() => navigate("/admin/orders")}>
                View Orders
              </Button>
            </div>
          }>
          <TableHeader>
            <TableColumn>Order ID</TableColumn>
            <TableColumn>Order Date</TableColumn>
            <TableColumn>Order Status</TableColumn>
            <TableColumn>Order Price</TableColumn>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.slice(0, 10).map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Chip
                        className={`p-1 ${
                          orderItem?.orderStatus === "Pending"
                            ? "bg-yellow-500"
                            : orderItem?.orderStatus === "Confirmed"
                            ? "bg-orange-500"
                            : orderItem?.orderStatus === "In Process"
                            ? "bg-cyan-500"
                            : orderItem?.orderStatus === "Shipped"
                            ? "bg-blue-500"
                            : orderItem?.orderStatus === "Delivered"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "Cancelled"
                            ? "bg-red-500"
                            : orderItem?.orderStatus === "Rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}>
                        {orderItem?.orderStatus}
                      </Chip>
                    </TableCell>
                    <TableCell>&#8377; {orderItem?.totalAmount}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminDashboard;
