import { Fragment, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdress,
  addMediaLinks,
  deleteMessage,
  fetchAdminInfo,
  fetchAllMessages,
  fetchMediaLinks,
} from "@/store/admin/footer-slice";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

const initialAddressFormData = {
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  phone: "",
};

const initialLinksFormData = {
  whatsapp: "",
  instagram: "",
  facebook: "",
  xtwitter: "",
};

function AdminFooter() {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [linkData, setLinkData] = useState(initialLinksFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLinksEditing, setIsLinksEditing] = useState(false);
  const { isLoading, messageList } = useSelector((state) => state.adminFooter);
  const dispatch = useDispatch();

  useEffect(() => {
    const AdminInfo = async () => {
      const result = await dispatch(fetchAdminInfo()).unwrap();

      if (result?.data) {
        setFormData(result?.data);
      }
    };
    AdminInfo();
  }, [dispatch]);

  useEffect(() => {
    const MediaLinks = async () => {
      const result = await dispatch(fetchMediaLinks()).unwrap();

      if (result?.data) {
        setLinkData(result?.data);
      }
    };
    MediaLinks();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinksChange = (e) => {
    const { name, value } = e.target;
    setLinkData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addAdress(formData)).unwrap();
      toast.success("Address updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update address:", error);
      toast.error("Error updating address.");
    }
  };

  const handleLinksSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addMediaLinks(linkData)).unwrap();
      toast.success("Media links updated successfully!");
      setIsLinksEditing(false);
    } catch (error) {
      console.error("Failed to update media links:", error);
      toast.error("Error updating media links.");
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await dispatch(deleteMessage(id)).unwrap();
      toast.success("Message deleted successfully!");
      dispatch(fetchAllMessages());
    } catch (error) {
      toast.error("Error deleting message: ", error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-between">
        <h2 className="text-2xl font-bold">Footer</h2>
      </div>

      <div className="flex w-full items-start justify-center flex-col gap-3 mt-5">
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">Admin Address</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full">
              <Textarea
                value={formData.address}
                name="address"
                placeholder="address"
                label="Address"
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <Input
                value={formData.city}
                name="city"
                placeholder="City"
                label="City"
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <Input
                value={formData.state}
                name="state"
                placeholder="State"
                label="State"
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <Input
                value={formData.country}
                name="country"
                placeholder="Country"
                label="Country"
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <Input
                value={formData.pincode}
                name="pincode"
                placeholder="Pincode"
                label="Pincode"
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <Input
                value={formData.phone}
                name="phone"
                placeholder="Phone Number"
                label="Phone Number"
                onChange={handleChange}
                readOnly={!isEditing}
              />
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              ) : (
                <div className="flex items-center justify-between gap-3 w-full">
                  <Button type="submit" disabled={isLoading} className="w-1/2">
                    Save Address
                  </Button>
                  <Button onClick={() => setIsEditing(false)} className="w-1/2">
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">Social Media Links</h2>
            <form
              onSubmit={handleLinksSubmit}
              className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">Whatsapp</p>
                <Input
                  value={linkData.whatsapp}
                  name="whatsapp"
                  placeholder="Whatsapp"
                  label="Whatsapp"
                  onChange={handleLinksChange}
                  readOnly={!isLinksEditing}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">Instagram</p>
                <Input
                  value={linkData.instagram}
                  name="instagram"
                  placeholder="Instagram"
                  label="Instagram"
                  onChange={handleLinksChange}
                  readOnly={!isLinksEditing}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">Facebook</p>
                <Input
                  value={linkData.facebook}
                  name="facebook"
                  placeholder="Facebook"
                  label="Facebook"
                  onChange={handleLinksChange}
                  readOnly={!isLinksEditing}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">Twitter</p>
                <Input
                  value={linkData.xtwitter}
                  name="xtwitter"
                  placeholder="Twitter"
                  label="Twitter"
                  onChange={handleLinksChange}
                  readOnly={!isLinksEditing}
                />
              </div>
              {!isLinksEditing ? (
                <Button onClick={() => setIsLinksEditing(true)}>Edit</Button>
              ) : (
                <div className="flex items-center justify-between gap-3 w-full">
                  <Button type="submit" disabled={isLoading} className="w-1/2">
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsLinksEditing(false)}
                    className="w-1/2">
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="flex w-full items-start justify-center flex-col gap-3 mt-10">
        <h2 className="text-lg font-bold">List Messages</h2>
        <div className="flex flex-col gap-3 w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">User ID</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right"> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messageList && messageList.length > 0
                ? messageList.map((messageItem) => (
                    <TableRow key={messageItem?._id}>
                      <TableCell className="w-[400px]">
                        {messageItem?._id}
                      </TableCell>
                      <TableCell>{messageItem?.message}</TableCell>
                      <TableCell className="text-right">
                        <Trash2
                          size={22}
                          color="red"
                          onClick={() => handleDeleteMessage(messageItem?._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminFooter;
