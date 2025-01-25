// import { setPosts, setSelectedPost } from "@/redux/postSlice";
// import axios from "axios";
// import { Bookmark, LocateIcon } from "lucide-react";
// import { useState } from "react";
// import { AiFillLike } from "react-icons/ai";
// import { FaComments } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import CommentDialog from "./CommentDialog";

// const Post = ({ post }) => {
//   const [text, setText] = useState("");
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((store) => store.auth);
//   const { posts } = useSelector((store) => store.post);
//   const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
//   const [postLike, setPostLike] = useState(post.likes.length);
//   const [comment, setComment] = useState(post.comments);
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     const inputText = e.target.value;
//     if (inputText.trim()) {
//       setText(inputText);
//     } else {
//       setText("");
//     }
//   };

//   const likeOrDislikeHandler = async () => {
//     try {
//       const action = liked ? "dislike" : "like";
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/post/${post._id}/${action}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         const updatedLikes = liked ? postLike - 1 : postLike + 1;
//         setPostLike(updatedLikes);
//         setLiked(!liked);

//         const updatedPostData = posts.map((p) =>
//           p._id === post._id
//             ? {
//                 ...p,
//                 likes: liked
//                   ? p.likes.filter((id) => id !== user._id)
//                   : [...p.likes, user._id],
//               }
//             : p
//         );
//         dispatch(setPosts(updatedPostData));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deletePostHandler = async () => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:8000/api/v1/post/delete/${post?._id}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         const updatedPostData = posts.filter(
//           (postItem) => postItem?._id !== post?._id
//         );
//         dispatch(setPosts(updatedPostData));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.messsage);
//     }
//   };

//   const bookmarkHandler = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/post/${post?._id}/bookmark`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="rounded-md hover:border border-purple-600  shadow-lg text-black w-full max-w-sm mx-auto bg-white p-4">
//       {/* Image Section */}
//       <img
//         className="rounded-lg w-full h-48 object-cover mb-4"
//         src={post.image}
//         alt={post.caption || "Product"}
//       />
//       {/* Product Information */}
//       <h3 className="font-bold text-xl mb-2">
//         {post.caption || "Unnamed Product"}
//       </h3>
//       <p className="text-sm text-black mb-2 line-clamp-2">{post.description}</p>
//       <p className="flex items-center text-sm text-black mb-2">
//         <LocateIcon className="text-red-400 mr-2" />
//         {post.location || "Unknown location"}
//       </p>
//       {/* Price Section */}
//       <p className="text-lg font-semibold text-purple-600 mb-4">
//         {post.price > 0 ? `NPR.${post.price}` : "Price not available"}
//       </p>
//       {/* Actions Section */}
//       <div className="flex items-center justify-between">
//         <div className="flex gap-4">
//           {/* Like Button */}
//           <AiFillLike
//             onClick={likeOrDislikeHandler}
//             size={24}
//             className={`cursor-pointer ${
//               liked ? "text-purple-600" : "hover:text-purple-600 text-black"
//             }`}
//           />
//           <span>{postLike}</span>

//           {/* Comment Button */}
//           <FaComments
//             onClick={() => {
//               dispatch(setSelectedPost(post));
//               setOpen(true);
//             }}
//             size={24}
//             className="cursor-pointer hover:text-black text-black"
//           />
//           <span>{comment.length}</span>
//         </div>

//         {/* Bookmark Button */}
//         <Bookmark
//           onClick={bookmarkHandler}
//           className="cursor-pointer hover:text-black text-black"
//         />
//       </div>
//       {/* Action Buttons */}
//       {/* {user?._id === post?.author?._id && (
//         <div className="flex justify-end mt-4 gap-2">
//           <Button
//             onClick={deletePostHandler}
//             className="bg-red-600 hover:bg-red-500 text-white text-sm"
//           >
//             Delete
//           </Button>
//         </div>
//       )} */}
//       {/* Comment Dialog */}
//       <CommentDialog post={post} open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Post;

import { setPosts, setSelectedPost } from "@/redux/postSlice";
import axios from "axios";
import { Bookmark, MapPin } from "lucide-react";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import CommentDialog from "./CommentDialog";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const [bookmarked, setBookmarked] = useState(false); //add a state for bookmarked
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
      console.log(error);
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
      console.log(error);
      toast.error(error.response.data.messsage);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post?._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setBookmarked(!bookmarked);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-md hover:border border-purple-600  shadow-lg text-black w-full max-w-sm mx-auto bg-white p-4">
      {/* Image Section */}
      <img
        className="rounded-lg w-full h-48 object-cover mb-4"
        src={post.image}
        alt={post.caption || "Product"}
      />
      {/* Product Information */}
      <h3 className="font-bold text-xl mb-2">
        {post.caption || "Unnamed Product"}
      </h3>
      <p className="text-sm text-black mb-2 line-clamp-2">{post.description}</p>
      <p className="flex items-center  text-sm font-semibold text-black mb-2">
        {/* <LocateIcon className="text-red-400 mr-2" /> */}
        <MapPin className=" mr-2 font-extrabold text-red-900 text-lg" />
        {post.location || "Unknown location"}
      </p>
      {/* Price Section */}
      <p className="text-lg font-semibold text-black mb-4">
        {post.price > 0 ? `NPR.${post.price}` : "Price not available"}
      </p>
      {/* Actions Section */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {/* Like Button */}
          <AiFillLike
            onClick={likeOrDislikeHandler}
            size={24}
            className={`cursor-pointer  text-black ${
              liked ? "text-red-600" : "text-black hover:text-red-600"
            }`}
          />
          <span>{postLike}</span>
          {/* Comment Button */}
          <FaComments
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            size={24}
            className="cursor-pointer hover:text-black text-black"
          />
          <span>{comment.length}</span>
        </div>
        {/* Bookmark Button */}
        <Bookmark
          onClick={bookmarkHandler}
          className={`cursor-pointer text-black ${
            bookmarked ? "text-red-600" : "text-black hover:text-red-600"
          }`}
        />
      </div>
      {/* Action Buttons */}
      {/* {user?._id === post?.author?._id && (
        <div className="flex justify-end mt-4 gap-2">
          <Button
            onClick={deletePostHandler}
            className="bg-red-600 hover:bg-red-500 text-white text-sm"
          >
            Delete
          </Button>
        </div>
      )} */}
      {/* Comment Dialog */}
      <CommentDialog post={post} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Post;
