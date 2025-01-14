import { setSelectedUser } from "@/redux/authSlice";
import { setPosts } from "@/redux/postSlice";

import axios from "axios";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Comment from "./Comment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";

const CommentDialog = ({ open, setOpen }) => {
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const { suggestUsers } = useSelector((store) => store.auth);

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
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
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-sm ml-8  sm:rounded-md  sm:max-w-xl md:max-w-2xl lg:max-w-4xl w-full rounded-md  p-0 flex flex-col"
      >
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
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
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
                  {/* <Link to={`/chat/${selectedPost?.author?._id}`}>
                    click me
                  </Link> */}
                  <Link to="/chat">click me</Link>
                </div>
              </div>
            </div>

            <hr />

            {/* Post Details */}
            <div className="p-4 space-y-2">
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

            {/* Comments Section */}
            <div className="flex-1 overflow-y-auto max-h-40 sm:max-h-60 md:max-h-96 p-4">
              {comment.map((comment) => (
                <Comment key={comment?._id} comment={comment} />
              ))}
            </div>

            {/* Interactions */}
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
