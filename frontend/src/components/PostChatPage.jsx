// import { setSelectedUser } from "@/redux/authSlice";
// import { setMessages } from "@/redux/chatSlice";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
// import axios from "axios";
// import { ArrowLeft, Loader, Smile } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import Messages from "./Messages";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// const PostChatPage = () => {
//   const [textMessage, setTextMessage] = useState("");
//   const { user, suggestedUsers, selectedUser } = useSelector(
//     (store) => store.auth
//   );
//   const { messages } = useSelector((store) => store.chat);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [isSending, setIsSending] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (userId) {
//         const selectedUserFromParams = suggestedUsers?.find(
//           (suggestedUser) => suggestedUser?._id === userId
//         );
//         if (selectedUserFromParams) {
//           dispatch(setSelectedUser(selectedUserFromParams));
//         } else {
//           try {
//             const res = await axios.get(
//               `http://localhost:8000/api/v1/user/${userId}`
//             );
//             if (res.data.success) {
//               dispatch(setSelectedUser(res.data.user));
//             } else {
//               toast.error("Error fetching user");
//               navigate("/home");
//             }
//           } catch (error) {
//             console.log(error);
//             toast.error("Error fetching user");
//             navigate("/home");
//           }
//         }
//         setLoading(false);
//       } else {
//         navigate("/home");
//       }
//     };
//     fetchUser();
//     return () => {
//       setLoading(true);
//       dispatch(setSelectedUser(null));
//     };
//   }, [dispatch, userId, suggestedUsers, navigate]);

//   const sendMessageHandler = async (receiverId) => {
//     if (!textMessage.trim()) return;
//     setIsSending(true);
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/message/send/${receiverId}`,
//         { message: textMessage },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         dispatch(setMessages([...(messages || []), res.data.newMessage]));
//         setTextMessage("");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Failed to send message.");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleEmojiSelect = (emoji) => {
//     setTextMessage((prevMessage) => prevMessage + emoji.native);
//     setShowEmojiPicker(false);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessageHandler(selectedUser?._id);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader className="animate-spin h-10 w-10 text-gray-500" />
//       </div>
//     );
//   }
//   if (!selectedUser) {
//     return <div>User not found</div>;
//   }

//   return (
//     <div className="flex h-screen mt-20 bg-gray-100 text-gray-800">
//       {/* Main Chat Section */}
//       <section className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <div className="bg-white shadow-md p-4 flex items-center gap-4 border-b border-gray-200">
//           <Button
//             variant="ghost"
//             onClick={() => navigate(-1)}
//             className="rounded-full p-2"
//           >
//             <ArrowLeft size={20} />
//           </Button>
//           <div className="flex items-center gap-3">
//             <Avatar className="w-8 h-8">
//               <AvatarImage src={selectedUser?.profilePicture} alt="Profile" />
//               <AvatarFallback>{selectedUser?.username[0]}</AvatarFallback>
//             </Avatar>
//             <span className="text-lg font-semibold">
//               {selectedUser?.username}
//             </span>
//           </div>
//         </div>

//         {/* Messages Section */}
//         <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
//           <Messages selectedUser={selectedUser} />
//         </div>

//         {/* Input Section */}
//         <div className="bg-white border-t border-gray-200 p-4 flex items-center gap-2">
//           <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
//             <PopoverTrigger asChild>
//               <Button
//                 type="button"
//                 variant="ghost"
//                 className="mr-2 px-2 hover:bg-gray-100 rounded-md"
//               >
//                 <Smile className="h-5 w-5" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="p-2 border-none shadow-md">
//               <Picker data={data} onEmojiSelect={handleEmojiSelect} />
//             </PopoverContent>
//           </Popover>
//           <Input
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             type="text"
//             onKeyDown={handleKeyDown}
//             className="flex-1 p-3 text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Type a message..."
//           />
//           <Button
//             onClick={() => sendMessageHandler(selectedUser?._id)}
//             className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg"
//             disabled={isSending}
//           >
//             {isSending ? (
//               <Loader className="animate-spin h-4 w-4 mr-2" />
//             ) : null}
//             {isSending ? "Sending..." : "Send"}
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PostChatPage;

import { setSelectedUser } from "@/redux/authSlice";
import { setMessages } from "@/redux/chatSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";
import { ArrowLeft, Loader, Smile } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Messages from "./Messages";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const PostChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const selectedUserFromParams = suggestedUsers?.find(
          (suggestedUser) => suggestedUser?._id === userId
        );
        if (selectedUserFromParams) {
          dispatch(setSelectedUser(selectedUserFromParams));
        } else {
          try {
            const res = await axios.get(
              `http://localhost:8000/api/v1/user/${userId}`
            );
            if (res.data.success) {
              dispatch(setSelectedUser(res.data.user));
            } else {
              toast.error("Error fetching user");
              navigate("/home");
            }
          } catch (error) {
            console.log(error);
            toast.error("Error fetching user");
            navigate("/home");
          }
        }
        setLoading(false);
      } else {
        navigate("/home");
      }
    };
    fetchUser();
    return () => {
      setLoading(true);
      dispatch(setSelectedUser(null));
    };
  }, [dispatch, userId, suggestedUsers, navigate]);

  const sendMessageHandler = async (receiverId) => {
    if (!textMessage.trim()) return;
    setIsSending(true);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${receiverId}`,
        { message: textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...(messages || []), res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to send message.");
    } finally {
      setIsSending(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setTextMessage((prevMessage) => prevMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageHandler(selectedUser?._id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader className="animate-spin h-12 w-12 text-indigo-600" />
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      {/* Main Chat Section */}
      <section className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white shadow-md p-4 flex items-center gap-4 border-b border-gray-200">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedUser?.profilePicture} alt="Profile" />
              <AvatarFallback className="bg-indigo-500 text-white">
                {selectedUser?.username[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium text-gray-800">
              {selectedUser?.username}
            </span>
          </div>
        </div>

        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Messages selectedUser={selectedUser} />
        </div>

        {/* Input Section */}
        <div className="bg-white border-t border-gray-200 p-4 flex items-center gap-2">
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="mr-2 px-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <Smile className="h-5 w-5 text-gray-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2 border-none shadow-lg rounded-lg">
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </PopoverContent>
          </Popover>
          <Input
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            type="text"
            onKeyDown={handleKeyDown}
            className="flex-1 p-3 text-gray-700 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
            placeholder="Type a message..."
          />
          <Button
            onClick={() => sendMessageHandler(selectedUser?._id)}
            className="bg-gradient-to-r from-black to-black hover:from-gray-800 hover:to-gray-700 text-white px-5 py-3 rounded-full transition-all duration-200"
            disabled={isSending}
          >
            {isSending ? (
              <Loader className="animate-spin h-4 w-4 mr-2" />
            ) : null}
            {isSending ? "Sending..." : "Send"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PostChatPage;
