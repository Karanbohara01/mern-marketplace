// import { setSelectedUser } from "@/redux/authSlice";
// import { setPosts } from "@/redux/postSlice";
// import axios from "axios";
// import { Edit, MoreVertical, Send, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { AiFillLike } from "react-icons/ai";
// import { FaComment } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";

// const CommentDialog = ({ open, setOpen, post }) => {
//   const [comment, setComment] = useState([]);
//   const dispatch = useDispatch();
//   const [text, setText] = useState("");
//   const { selectedPost, posts } = useSelector((store) => store.post);
//   const { user, suggestUsers, selecteduser } = useSelector(
//     (store) => store.auth
//   );
//   const [expandedComments, setExpandedComments] = useState({}); // Track expanded state of comments
//   const [editPostOpen, setEditPostOpen] = useState(false); // State for editing the post
//   const [editCommentId, setEditCommentId] = useState(null); // Tracks which comment is being edited
//   const [editCommentText, setEditCommentText] = useState("");
//   const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
//   const [editedCaption, setEditedCaption] = useState("");
//   const [editedDescription, setEditedDescription] = useState("");
//   const [editedPrice, setEditedPrice] = useState("");
//   const [editedLocation, setEditedLocation] = useState("");

//   useEffect(() => {
//     if (selectedPost) {
//       setComment(selectedPost.comments);
//     }
//   }, [selectedPost]);

//   useEffect(() => {
//     if (selectedPost) {
//       setEditedCaption(selectedPost.caption);
//       setEditedDescription(selectedPost.description);
//       setEditedPrice(selectedPost.price);
//       setEditedLocation(selectedPost.location);
//     }
//   }, [selectedPost]);

//   const changeEventHandler = (e) => {
//     const inputText = e.target.value;
//     if (inputText.trim()) {
//       setText(inputText);
//     } else {
//       setText("");
//     }

//     useEffect(() => {
//       return () => {
//         dispatch(setSelectedUser(null));
//       };
//     }, []);
//   };

//   const sendCommentHandler = async () => {
//     if (!text.trim()) return; // Prevent empty comments
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`,
//         { text },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         const updatedCommentData = [...comment, res.data.comment];
//         setComment(updatedCommentData);

//         const updatedPostData = posts.map((p) =>
//           p._id === selectedPost._id
//             ? { ...p, comments: updatedCommentData }
//             : p
//         );
//         dispatch(setPosts(updatedPostData));
//         toast.success(res.data.message);
//         setText("");
//       }
//     } catch (error) {
//       console.error("Error sending comment:", error);
//       toast.error(error.response?.data?.message || "Failed to add comment.");
//     }
//   };
//   const toggleCommentExpansion = (commentId) => {
//     setExpandedComments((prevExpanded) => ({
//       ...prevExpanded,
//       [commentId]: !prevExpanded[commentId],
//     }));
//   };

//   // Handle editing of a post
//   const handleEditPost = () => {
//     setIsPostEditModalOpen(true);
//   };

//   // Handle deleting of a post
//   const handleDeletePost = async () => {
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

//   const handleOpenEditComment = (commentId, commentText) => {
//     setEditCommentId(commentId);
//     setEditCommentText(commentText);
//   };

//   const handleCancelEditComment = () => {
//     setEditCommentId(null);
//     setEditCommentText("");
//   };

//   const handleUpdateComment = async () => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:8000/api/v1/post/${post?._id}/comment/${editCommentId}`,
//         { text: editCommentText },
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         const updatedComments = comment.map((c) =>
//           c._id === editCommentId ? { ...c, text: editCommentText } : c
//         );
//         setComment(updatedComments);
//         dispatch(
//           setPosts(
//             posts.map((p) =>
//               p._id === selectedPost._id
//                 ? { ...p, comments: updatedComments }
//                 : p
//             )
//           )
//         );
//         toast.success(res.data.message);
//         handleCancelEditComment(); // Reset edit state
//       } else {
//         toast.error(res.data.message || "Failed to edit comment.");
//       }
//     } catch (error) {
//       console.error("Error updating comment:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to edit the comment."
//       );
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:8000/api/v1/post/${post?._id}/comment/${commentId}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         const updatedComments = comment.filter((c) => c._id !== commentId);
//         setComment(updatedComments);
//         dispatch(
//           setPosts(
//             posts.map((p) =>
//               p._id === selectedPost._id
//                 ? { ...p, comments: updatedComments }
//                 : p
//             )
//           )
//         );
//         toast.success(res.data.message);
//       } else {
//         toast.error(res.data.message || "Failed to delete comment.");
//       }
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to delete the comment."
//       );
//     }
//   };

//   const handleCancelPostEdit = () => {
//     setIsPostEditModalOpen(false);
//   };

//   const handleUpdatePost = async () => {
//     if (
//       !editedCaption.trim() ||
//       !editedDescription.trim() ||
//       !editedPrice ||
//       !editedLocation
//     ) {
//       toast.error("Please fill all the fields");
//     }
//     try {
//       const res = await axios.put(
//         `http://localhost:8000/api/v1/post/${post?._id}`,
//         {
//           caption: editedCaption,
//           description: editedDescription,
//           price: editedPrice,
//           location: editedLocation,
//         },
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         const updatedPosts = posts.map((p) =>
//           p._id === selectedPost._id
//             ? {
//                 ...p,
//                 caption: editedCaption,
//                 description: editedDescription,
//                 price: editedPrice,
//                 location: editedLocation,
//               }
//             : p
//         );
//         dispatch(setPosts(updatedPosts));
//         toast.success(res.data.message);
//         setIsPostEditModalOpen(false);
//       } else {
//         toast.error(res.data.message || "Failed to update post.");
//       }
//     } catch (error) {
//       console.error("Error updating post:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update the post."
//       );
//     }
//   };

//   return (
//     <Dialog open={open}>
//       <DialogContent
//         onInteractOutside={() => setOpen(false)}
//         className="max-w-sm ml-8  sm:rounded-md  sm:max-w-xl md:max-w-2xl lg:max-w-4xl w-full rounded-md  p-0 flex flex-col"
//       >
//         <div className="flex  flex-col lg:flex-row flex-1">
//           {/* Image Section */}
//           <div className="w-full  lg:w-1/2 h-64 lg:h-auto">
//             <img
//               src={selectedPost?.image}
//               alt="post_img"
//               className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-lg"
//             />
//           </div>

//           {/* Content Section */}
//           <div className="w-full lg:w-1/2 flex flex-col justify-between">
//             {/* Header */}
//             <div className="flex items-center justify-between p-4">
//               <div className="flex gap-3 items-center">
//                 <Link>
//                   <Avatar>
//                     <AvatarImage src={selectedPost?.author?.profilePicture} />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                 </Link>
//                 <div>
//                   <Link className="font-semibold text-xs sm:text-sm">
//                     {selectedPost?.author?.username}
//                   </Link>
//                 </div>

//                 <div>
//                   {user?._id === selectedPost?.author?._id && (
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           className="p-2 hover:bg-gray-100"
//                         >
//                           <MoreVertical size={16} />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="w-32">
//                         <DropdownMenuItem onClick={handleEditPost}>
//                           <Edit size={16} className="mr-2" />
//                           Edit Post
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={handleDeletePost}
//                           className="text-red-500 hover:bg-red-50"
//                         >
//                           <Trash size={16} className="mr-2" />
//                           Delete Post
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <hr />

//             {/* Post Details */}
//             <div className="p-4 space-y-2">
//               <h1 className="font-bold text-lg sm:text-xl">
//                 <Link>{selectedPost?.caption}</Link>
//               </h1>
//               <h1 className="font-bold text-lg sm:text-xl">
//                 <Link>NPR.{selectedPost?.price}</Link>
//               </h1>
//               <p className="font-bold text-sm sm:text-base">
//                 <Link>{selectedPost?.description}</Link>
//               </p>
//               <p className="font-bold text-sm sm:text-base">
//                 <Link>{selectedPost?.location}</Link>
//               </p>
//               <p className="font-bold text-sm sm:text-base">
//                 <Link>{selectedPost?.status}</Link>
//               </p>
//             </div>

//             {/* Comments Section */}
//             <div className="flex-1 overflow-y-auto max-h-40 sm:max-h-60 md:max-h-96 p-4">
//               {comment.map((comment) => (
//                 <div key={comment._id} className="mb-2">
//                   <div className="flex items-start justify-between">
//                     <div className="flex gap-2 items-start w-full">
//                       <Link>
//                         <Avatar>
//                           <AvatarImage src={comment.author?.profilePicture} />
//                           <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                       </Link>
//                       <div>
//                         <Link className="font-semibold text-xs sm:text-sm">
//                           {comment.author?.username}
//                         </Link>
//                         {editCommentId === comment._id ? (
//                           <div className="flex mt-2 gap-1">
//                             <input
//                               type="text"
//                               value={editCommentText}
//                               onChange={(e) =>
//                                 setEditCommentText(e.target.value)
//                               }
//                               className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
//                             />
//                             <Button
//                               onClick={handleUpdateComment}
//                               variant="outline"
//                               size="xs"
//                             >
//                               Update
//                             </Button>
//                             <Button
//                               onClick={handleCancelEditComment}
//                               variant="outline"
//                               size="xs"
//                             >
//                               Cancel
//                             </Button>
//                           </div>
//                         ) : (
//                           <p className="text-sm mt-1">
//                             {comment.text.length > 100 &&
//                             !expandedComments[comment._id]
//                               ? `${comment.text.substring(0, 100)}...`
//                               : comment.text}
//                             {comment.text.length > 100 &&
//                               !expandedComments[comment._id] && (
//                                 <button
//                                   className="text-blue-500 ml-1 text-xs"
//                                   onClick={() =>
//                                     toggleCommentExpansion(comment._id)
//                                   }
//                                 >
//                                   See more
//                                 </button>
//                               )}
//                             {comment.text.length > 100 &&
//                               expandedComments[comment._id] && (
//                                 <button
//                                   className="text-blue-500 ml-1 text-xs"
//                                   onClick={() =>
//                                     toggleCommentExpansion(comment._id)
//                                   }
//                                 >
//                                   See less
//                                 </button>
//                               )}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Edit/Delete Dropdown for Each Comment */}
//                     {user?._id === comment.author?._id && (
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="p-1">
//                             <MoreVertical size={16} />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className="w-32">
//                           <DropdownMenuItem
//                             onClick={() =>
//                               handleOpenEditComment(comment._id, comment.text)
//                             }
//                           >
//                             <Edit size={16} className="mr-2" />
//                             Edit
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleDeleteComment(comment._id)}
//                             className="text-red-500 hover:bg-red-50"
//                           >
//                             <Trash size={16} className="mr-2" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Interactions */}
//             <div className="flex items-center justify-evenly p-4 space-x-4 text-xs sm:text-sm">
//               <div className="flex items-center gap-2">
//                 <AiFillLike />
//                 <span>{selectedPost?.likes?.length} likes</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaComment />
//                 <span>{selectedPost?.comments?.length} comments</span>
//               </div>
//               <Link to="/chat">
//                 <div className="flex items-center gap-2">
//                   <Send />
//                   <span>Send offer?</span>
//                 </div>
//               </Link>
//             </div>

//             {/* Add Comment */}
//             <div className="p-4">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={text}
//                   onChange={changeEventHandler}
//                   placeholder="Add a comment..."
//                   className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
//                 />
//                 <Button
//                   disabled={!text.trim()}
//                   onClick={sendCommentHandler}
//                   variant="outline"
//                 >
//                   Send
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//       {/* Edit Post Modal */}
//       <Dialog open={isPostEditModalOpen} onOpenChange={setIsPostEditModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Post</DialogTitle>
//           </DialogHeader>

//           <div className="flex flex-col gap-4">
//             <input
//               type="text"
//               value={editedCaption}
//               onChange={(e) => setEditedCaption(e.target.value)}
//               placeholder="Enter edited caption"
//               className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
//             />
//             <input
//               type="text"
//               value={editedDescription}
//               onChange={(e) => setEditedDescription(e.target.value)}
//               placeholder="Enter edited description"
//               className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
//             />
//             <input
//               type="number"
//               value={editedPrice}
//               onChange={(e) => setEditedPrice(e.target.value)}
//               placeholder="Enter edited Price"
//               className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
//             />
//             <input
//               type="text"
//               value={editedLocation}
//               onChange={(e) => setEditedLocation(e.target.value)}
//               placeholder="Enter edited location"
//               className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
//             />

//             <div className="flex justify-end gap-2">
//               <Button variant="secondary" onClick={handleCancelPostEdit}>
//                 Cancel
//               </Button>
//               <Button onClick={handleUpdatePost}>Update Post</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </Dialog>
//   );
// };

// export default CommentDialog;

import { setSelectedUser } from "@/redux/authSlice";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { Edit, MoreVertical, Send, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const CommentDialog = ({ open, setOpen, post }) => {
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const { user, suggestUsers, selecteduser } = useSelector(
    (store) => store.auth
  );
  const [expandedComments, setExpandedComments] = useState({}); // Track expanded state of comments
  const [editPostOpen, setEditPostOpen] = useState(false); // State for editing the post
  const [editCommentId, setEditCommentId] = useState(null); // Tracks which comment is being edited
  const [editCommentText, setEditCommentText] = useState("");
  const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
  const [editedCaption, setEditedCaption] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [activeTab, setActiveTab] = useState("comments"); // State to track active tab

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost) {
      setEditedCaption(selectedPost.caption);
      setEditedDescription(selectedPost.description);
      setEditedPrice(selectedPost.price);
      setEditedLocation(selectedPost.location);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }

    useEffect(() => {
      return () => {
        dispatch(setSelectedUser(null));
      };
    }, []);
  };

  const sendCommentHandler = async () => {
    if (!text.trim()) return; // Prevent empty comments
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`,
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
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.error("Error sending comment:", error);
      toast.error(error.response?.data?.message || "Failed to add comment.");
    }
  };
  const toggleCommentExpansion = (commentId) => {
    setExpandedComments((prevExpanded) => ({
      ...prevExpanded,
      [commentId]: !prevExpanded[commentId],
    }));
  };

  // Handle editing of a post
  const handleEditPost = () => {
    setIsPostEditModalOpen(true);
  };

  // Handle deleting of a post
  const handleDeletePost = async () => {
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

  const handleOpenEditComment = (commentId, commentText) => {
    setEditCommentId(commentId);
    setEditCommentText(commentText);
  };

  const handleCancelEditComment = () => {
    setEditCommentId(null);
    setEditCommentText("");
  };

  const handleUpdateComment = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/post/${post?._id}/comment/${editCommentId}`,
        { text: editCommentText },
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedComments = comment.map((c) =>
          c._id === editCommentId ? { ...c, text: editCommentText } : c
        );
        setComment(updatedComments);
        dispatch(
          setPosts(
            posts.map((p) =>
              p._id === selectedPost._id
                ? { ...p, comments: updatedComments }
                : p
            )
          )
        );
        toast.success(res.data.message);
        handleCancelEditComment(); // Reset edit state
      } else {
        toast.error(res.data.message || "Failed to edit comment.");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error(
        error.response?.data?.message || "Failed to edit the comment."
      );
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/${post?._id}/comment/${commentId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedComments = comment.filter((c) => c._id !== commentId);
        setComment(updatedComments);
        dispatch(
          setPosts(
            posts.map((p) =>
              p._id === selectedPost._id
                ? { ...p, comments: updatedComments }
                : p
            )
          )
        );
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete the comment."
      );
    }
  };

  const handleCancelPostEdit = () => {
    setIsPostEditModalOpen(false);
  };

  const handleUpdatePost = async () => {
    if (
      !editedCaption.trim() ||
      !editedDescription.trim() ||
      !editedPrice ||
      !editedLocation
    ) {
      toast.error("Please fill all the fields");
    }
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/post/${post?._id}`,
        {
          caption: editedCaption,
          description: editedDescription,
          price: editedPrice,
          location: editedLocation,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedPosts = posts.map((p) =>
          p._id === selectedPost._id
            ? {
                ...p,
                caption: editedCaption,
                description: editedDescription,
                price: editedPrice,
                location: editedLocation,
              }
            : p
        );
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
        setIsPostEditModalOpen(false);
      } else {
        toast.error(res.data.message || "Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error(
        error.response?.data?.message || "Failed to update the post."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm ml-8  sm:rounded-md  sm:max-w-xl md:max-w-2xl lg:max-w-4xl w-full rounded-md  p-0 flex flex-col">
        <div className="flex  flex-col lg:flex-row flex-1">
          {/* Image Section */}
          <div className="w-full  lg:w-1/2 h-64 lg:h-auto">
            <img
              src={selectedPost?.image}
              alt="post_img"
              className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-lg"
            />
          </div>
          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col ">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs sm:text-sm">
                    {selectedPost?.author?.username}
                  </Link>
                </div>

                <div>
                  {user?._id === selectedPost?.author?._id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="p-2 hover:bg-gray-100"
                        >
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-32">
                        <DropdownMenuItem onClick={handleEditPost}>
                          <Edit size={16} className="mr-2" />
                          Edit Post
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleDeletePost}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <Trash size={16} className="mr-2" />
                          Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>

            <hr />
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="p-4"
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="more">More</TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="mt-4">
                {/* Comments Section */}

                <div className="flex-1 overflow-y-auto max-h-40 sm:max-h-60 md:max-h-96 ">
                  {comment.map((comment) => (
                    <div key={comment._id} className="mb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-2 items-start w-full">
                          <Link>
                            <Avatar>
                              <AvatarImage
                                src={comment.author?.profilePicture}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </Link>
                          <div>
                            <Link className="font-semibold text-xs sm:text-sm">
                              {comment.author?.username}
                            </Link>
                            {editCommentId === comment._id ? (
                              <div className="flex mt-2 gap-1">
                                <input
                                  type="text"
                                  value={editCommentText}
                                  onChange={(e) =>
                                    setEditCommentText(e.target.value)
                                  }
                                  className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
                                />
                                <Button
                                  onClick={handleUpdateComment}
                                  variant="outline"
                                  size="xs"
                                >
                                  Update
                                </Button>
                                <Button
                                  onClick={handleCancelEditComment}
                                  variant="outline"
                                  size="xs"
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <p className="text-sm mt-1">
                                {comment.text.length > 100 &&
                                !expandedComments[comment._id]
                                  ? `${comment.text.substring(0, 100)}...`
                                  : comment.text}
                                {comment.text.length > 100 &&
                                  !expandedComments[comment._id] && (
                                    <button
                                      className="text-blue-500 ml-1 text-xs"
                                      onClick={() =>
                                        toggleCommentExpansion(comment._id)
                                      }
                                    >
                                      See more
                                    </button>
                                  )}
                                {comment.text.length > 100 &&
                                  expandedComments[comment._id] && (
                                    <button
                                      className="text-blue-500 ml-1 text-xs"
                                      onClick={() =>
                                        toggleCommentExpansion(comment._id)
                                      }
                                    >
                                      See less
                                    </button>
                                  )}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Edit/Delete Dropdown for Each Comment */}
                        {user?._id === comment.author?._id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="p-1">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleOpenEditComment(
                                    comment._id,
                                    comment.text
                                  )
                                }
                              >
                                <Edit size={16} className="mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteComment(comment._id)}
                                className="text-red-500 hover:bg-red-50"
                              >
                                <Trash size={16} className="mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Add Comment */}
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={text}
                      onChange={changeEventHandler}
                      placeholder="Add a comment..."
                      className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
                    />
                    <Button
                      disabled={!text.trim()}
                      onClick={sendCommentHandler}
                      variant="outline"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details" className="mt-4 p-4">
                {/* Product Details Section */}
                <div className="space-y-2">
                  <h1 className="font-bold text-lg sm:text-xl">
                    <Link>{selectedPost?.caption}</Link>
                  </h1>
                  <h1 className="font-bold text-lg sm:text-xl">
                    <Link>NPR.{selectedPost?.price}</Link>
                  </h1>
                  <p className="font-bold text-sm sm:text-base">
                    <Link>{selectedPost?.description}</Link>
                  </p>
                  <p className="font-bold text-sm sm:text-base">
                    <Link>{selectedPost?.location}</Link>
                  </p>
                  <p className="font-bold text-sm sm:text-base">
                    <Link>{selectedPost?.status}</Link>
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="more" className="mt-4">
                {/* More Options Section */}
                <div className="flex items-center justify-evenly p-4 space-x-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <AiFillLike />
                    <span>{selectedPost?.likes?.length} likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaComment />
                    <span>{selectedPost?.comments?.length} comments</span>
                  </div>
                  <Link to="/chat">
                    <div className="flex items-center gap-2">
                      <Send />
                      <span>Send offer?</span>
                    </div>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>

      {/* Edit Post Modal */}
      <Dialog open={isPostEditModalOpen} onOpenChange={setIsPostEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              placeholder="Enter edited caption"
              className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Enter edited description"
              className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
            />
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              placeholder="Enter edited Price"
              className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
              placeholder="Enter edited location"
              className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={handleCancelPostEdit}>
                Cancel
              </Button>
              <Button onClick={handleUpdatePost}>Update Post</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default CommentDialog;
