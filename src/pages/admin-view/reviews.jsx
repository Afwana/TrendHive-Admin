import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReview,
  getAllReviewsForAdmin,
} from "@/store/admin/review-slice";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

function AdminReviews() {
  const [keyword, setKeyword] = useState("");

  const { reviewList } = useSelector((state) => state.adminReviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsForAdmin());
  }, [dispatch]);

  const filteredReviews = reviewList?.filter((review) => {
    const searchValue = keyword.toLowerCase();
    return (
      review?._id.toLowerCase().includes(searchValue) ||
      review?.productId.toLowerCase().includes(searchValue) ||
      review?.userId.toLowerCase().includes(searchValue) ||
      review?.userName.toLowerCase().includes(searchValue)
    );
  });

  const handleDeleteReview = async (id) => {
    try {
      await dispatch(deleteReview(id)).unwrap();
      toast.success("Review deleted successfully!");
      dispatch(getAllReviewsForAdmin());
    } catch (error) {
      toast.error("Error deleting review: ", error);
    }
  };

  return (
    <Table
      topContent={
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Reviews</h1>
          <div>
            <Input
              value={keyword}
              name="keyword"
              onChange={(event) => setKeyword(event.target.value)}
              className="w-full"
              placeholder="Search Reviews..."
            />
          </div>
        </div>
      }
      classNames={{
        wrapper: "w-[390px] md:w-full",
      }}>
      <TableHeader>
        <TableColumn>Review ID</TableColumn>
        <TableColumn>User ID</TableColumn>
        <TableColumn>User Name</TableColumn>
        <TableColumn>Product ID</TableColumn>
        <TableColumn>Review</TableColumn>
        <TableColumn>Review Value</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
        {filteredReviews && filteredReviews.length > 0
          ? filteredReviews.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?._id}</TableCell>
                <TableCell>{item?.userId}</TableCell>
                <TableCell>{item?.userName}</TableCell>
                <TableCell>{item?.productId}</TableCell>
                <TableCell>{item?.reviewMessage}</TableCell>
                <TableCell>{item?.reviewValue}</TableCell>
                <TableCell className="text-right">
                  <Trash2
                    size={22}
                    color="red"
                    onClick={() => handleDeleteReview(item?._id)}
                  />
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
}

export default AdminReviews;
