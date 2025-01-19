import { setPosts, setSelectedPost } from "@/redux/postSlice";
import axios from "axios";
import { Bookmark, LocateIcon } from "lucide-react";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import CommentDialog from "../CommentDialog";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const ClothesCategory = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post?.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post?.likes.length);
  const [comment, setComment] = useState(post?.comments);
  const { selectedPost } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post?._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Filter logic: Ensure at least one category is "Clothes"
  const isClothesCategory = post?.category?.some(
    (cat) => cat.name.toLowerCase() === "clothes"
  );

  if (!isClothesCategory) {
    return null; // Skip rendering if category is not "Clothes"
  }

  return (
    <div className="my-8 rounded-md text-white w-full max-w-sm mx-auto">
      <div className="flex items-center justify-end">
        <Dialog>
          <DialogTrigger asChild>
            {/* <MoreHorizontal className="cursor-pointer mx-4 my-1" /> */}
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {post?.author?._id !== user?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
            )}
            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>
            {user && user?._id === post?.author?._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer w-fit"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-lg my-0 p-1 h-32 w-52 aspect-square object-cover"
        src={post.image}
        alt="post_img"
      />

      <div className="flex items-center justify-between mx-2 my-2">
        <div className="flex items-center gap-4">
          {liked ? (
            <AiFillLike
              onClick={likeOrDislikeHandler}
              size={"24"}
              className="cursor-pointer text-red-600"
            />
          ) : (
            <AiFillLike
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer hover:text-white"
            />
          )}

          <FaComments
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer h-5 w-7 hover:text-white"
          />
        </div>
        <div className="flex gap-2">
          <Bookmark
            onClick={bookmarkHandler}
            className="cursor-pointer hover:text-white"
          />
          <span>Save</span>
        </div>
      </div>

      <p className="mx-2">{post.caption}</p>
      <span className="mx-2 flex text-red-600 gap-2">
        <LocateIcon className="text-red-400" />
        Kathmandu
      </span>
      <span className="mx-2 flex text-red-600 gap-2">
        {post.category.map((cat) => (
          <span className="text-white" key={cat._id}>
            {cat.name}
          </span>
        ))}
      </span>

      <div className="flex items-center mb-6 justify-start gap-4">
        <div className="w-32 flex items-center justify-center gap-2">
          Price: {post.price > 0 ? <span>{post.price}</span> : <span>n/a</span>}
        </div>

        {comment.length >= 0 && (
          <span
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer text-sm text-white"
          >
            <Button className="bg-green-500">View Details</Button>
          </span>
        )}
      </div>

      <CommentDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default ClothesCategory;