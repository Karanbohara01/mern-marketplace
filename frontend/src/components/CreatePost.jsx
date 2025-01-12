import { readFileAsDataURL } from "@/lib/utils";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const CreatePost = ({ open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [price, setPrice] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

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
      if (file) formData.append("image", file);
      if (price.trim()) formData.append("price", price.trim()); // Append only if not empty

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
        setFile(null);
        setCaption("");
        setPrice("");
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

  const fileChangeHandler = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const dataUrl = await readFileAsDataURL(selectedFile);
      setImagePreview(dataUrl);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="flex font-semibold items-center">
          Create New Post
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">{user?.username}</h1>
            <span className="text-gray-600 text-xs">{user?.bio}</span>
          </div>
        </div>

        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write product name..."
          className="focus-visible:ring-transparent border-none"
        />
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="focus-visible:ring-transparent border-none"
          type="text"
          placeholder="Enter price"
        ></Input>

        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={fileChangeHandler}
        />

        {imagePreview && (
          <div className="h-64 w-full flex items-center justify-center object-contain">
            <img
              className="h-64 w-full rounded-md object-cover"
              src={imagePreview}
              alt="Image Preview"
            />
          </div>
        )}

        <Button onClick={() => imageRef.current.click()} className="mt-2">
          Select from Device
        </Button>

        <div className="mt-4">
          <Button
            className="w-full"
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
