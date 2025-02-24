import { readFileAsDataURL } from "@/lib/utils";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const API_URL = "http://localhost:8000/api/v1/category";

const CreatePost = ({ open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("productname"); // Default to the first tab

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true,
      });

      if (response.data && Array.isArray(response.data)) {
        setCategories(response.data);
        console.log("categories are:", response.data);
      } else {
        setError("Invalid category data received from server.");
        console.error(
          "Invalid category data received from server:",
          response.data
        );
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const fileChangeHandler = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const dataUrl = await readFileAsDataURL(selectedFile);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();

    if (!caption.trim() && !file) {
      toast.error("Please add a caption or an image.");
      return;
    }
    if (price && isNaN(Number(price))) {
      toast.error("Price must be a valid number.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      if (file) formData.append("image", file);

      const res = await axios.post(
        "http://localhost:8000/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setPosts([res.data.post, ...posts]));
        setCaption("");
        setDescription("");
        setPrice("");
        setCategory("");
        setLocation("");
        setFile(null);
        setImagePreview("");
        setOpen(false);
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "productname":
        return (
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write product name..."
            className="focus-visible:ring-transparent border border-gray-300 mb-4 rounded-md p-2"
            rows="1"
          />
        );
      case "description":
        return (
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write product description..."
            className="focus-visible:ring-transparent border border-gray-300 mb-4 rounded-md p-2"
            rows="2"
          />
        );
      case "price":
        return (
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            placeholder="Enter price"
            className="mb-4 border border-gray-300 rounded-md p-2"
          />
        );
      case "location":
        return (
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Enter location"
            className="mb-4 border border-gray-300 rounded-md p-2"
          />
        );
      case "photos":
        return (
          <div>
            <Input
              ref={imageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={fileChangeHandler}
            />

            {imagePreview && (
              <div className="w-full h-64 flex items-center justify-center object-contain mb-4">
                <img
                  className="h-full w-full rounded-md object-cover"
                  src={imagePreview}
                  alt="Image Preview"
                />
              </div>
            )}

            <Button
              onClick={() => imageRef.current.click()}
              className="w-full sm:w-auto mb-4 bg-blue-500 text-white hover:bg-blue-600"
            >
              Select from Device
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 md:p-6 lg:p-8 ml-12 mt-1 mb-2 max-h-screen overflow-y-auto"
      >
        <DialogHeader className="flex font-semibold items-center mb-4">
          Create New Post
        </DialogHeader>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.profilePicture} alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-sm md:text-base">
              {user?.username}
            </h1>
            <span className="text-gray-600 text-xs">{user?.bio}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`px-4 py-2 -mb-px  ${
              activeTab === "productname"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("productname")}
          >
            Product Name
          </button>
          <button
            className={`px-4 py-2 -mb-px  ${
              activeTab === "description"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 -mb-px  ${
              activeTab === "price"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("price")}
          >
            Price
          </button>
          <button
            className={`px-4 py-2 -mb-px  ${
              activeTab === "location"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("location")}
          >
            Location
          </button>
          <button
            className={`px-4 py-2 -mb-px  ${
              activeTab === "photos"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>
        </div>

        {/* Tab content based on the active tab */}
        {renderTabContent()}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {activeTab !== "location" && activeTab !== "price" && (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Category:
            </label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-2 py-2 mb-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Select a category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </>
        )}

        <div className="mt-4">
          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={createPostHandler}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
