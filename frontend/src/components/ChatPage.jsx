import { setSelectedUser } from "@/redux/authSlice";
import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { MessageCircleCode } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  console.log(user);

  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
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
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    // <div className="flex ml-[14%]  h-screen">
    //   <section className="sm:w-1/2 lg:w-1/4  md:w-1/4 my-8">
    //     <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
    //     <hr className="mb-4 border-gray-300" />
    //     <div className="overflow-y-auto   h-[80vh]">
    //       {suggestedUsers.map((suggestedUser) => {
    //         const isOnline = onlineUsers.includes(suggestedUser?._id);
    //         return (
    //           <div
    //             onClick={() => dispatch(setSelectedUser(suggestedUser))}
    //             className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
    //           >
    //             <Avatar className="w-14 h-14">
    //               <AvatarImage src={suggestedUser?.profilePicture} />
    //               <AvatarFallback>CN</AvatarFallback>
    //             </Avatar>
    //             <div className="flex flex-col">
    //               <span className="font-medium">{suggestedUser?.username}</span>
    //               <span
    //                 className={`text-xs font-bold ${
    //                   isOnline ? "text-green-600" : "text-red-600"
    //                 } `}
    //               >
    //                 {isOnline ? "online" : "offline"}
    //               </span>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </section>
    //   {selectedUser ? (
    //     <section className="flex-1 border-l   border-l-gray-300 flex flex-col h-full">
    //       <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
    //         <Avatar>
    //           <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
    //           <AvatarFallback>CN</AvatarFallback>
    //         </Avatar>
    //         <div className="flex flex-col">
    //           <span>{selectedUser?.username}</span>
    //         </div>
    //       </div>
    //       <Messages selectedUser={selectedUser} />
    //       <div className="flex items-center p-4 border-t border-t-gray-300">
    //         <Input
    //           value={textMessage}
    //           onChange={(e) => setTextMessage(e.target.value)}
    //           type="text"
    //           className="flex-1 mr-2 focus-visible:ring-transparent"
    //           placeholder="Messages..."
    //         />
    //         <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
    //           Send
    //         </Button>
    //       </div>
    //     </section>
    //   ) : (
    //     <div className="flex  w-1/2 flex-col items-center justify-center mx-auto">
    //       <MessageCircleCode className="w-32 h-32 my-4" />
    //       <h1 className="font-medium">Your messages</h1>
    //       <span>Send a message to start a chat.</span>
    //     </div>
    //   )}
    // </div>

    <div className="flex ml-[10%] h-screen bg-gray-100">
      {/* Sidebar section */}
      <section className="w-1/3 my-8 px-6">
        <h1 className="font-semibold mb-5 text-2xl text-gray-700">
          {user?.username}
        </h1>
        <hr className="mb-6 border-gray-300" />
        <div className="overflow-y-auto h-[80vh] pr-3">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex gap-4 items-center p-3 rounded-lg hover:bg-blue-100 cursor-pointer mb-3 transition ease-in-out duration-300"
              >
                <Avatar className="w-16 h-16 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white flex justify-center items-center">
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {suggestedUser?.username}
                  </span>
                  <span
                    className={`text-xs font-semibold mt-1 ${
                      isOnline ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    {isOnline ? "Active now" : "Offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main chat section */}
      {selectedUser ? (
        <section className="flex-1 bg-white border-l border-gray-300 flex flex-col h-full rounded-tl-lg shadow-lg">
          <div className="flex gap-3 items-center px-6 py-4 border-b border-gray-300 sticky top-0 bg-gradient-to-r from-gray-950 to-gray-900 text-white z-10">
            <Avatar className="w-12 h-12">
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-xl">
                {selectedUser?.username}
              </span>
            </div>
          </div>
          <Messages selectedUser={selectedUser} />
          <div className="flex items-center px-6 py-4 border-t border-t-gray-300">
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex-1 bg-gray-200 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <Button
              onClick={() => sendMessageHandler(selectedUser?._id)}
              className="ml-3 text-white bg-gray-900 hover:bg-gray-700 p-2 rounded-md transition duration-300"
            >
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex w-full flex-col items-center justify-center mx-auto text-gray-600">
          <MessageCircleCode className="w-24 h-24 mb-6 text-blue-600" />
          <h1 className="font-semibold text-2xl text-gray-800 mb-3">
            No Messages Yet
          </h1>
          <span>Click on a user to start a conversation.</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
