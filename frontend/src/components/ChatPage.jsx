import { setSelectedUser } from "@/redux/authSlice";
import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { MenuIcon, MessageCircleCode } from "lucide-react";
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
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Sidebar */}
      <section className="lg:w-1/4 md:w-1/3 w-full flex flex-col border-r border-gray-800 bg-gray-800 relative">
        {/* Logo and Title */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h1 className="text-lg font-bold text-center  min-w-full mt-20">
            Koselie Chat
          </h1>
          <button className="lg:hidden block text-white">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Suggested Users */}
        <h2 className=" mt-4 text-center text-sm font-semibold tracking-wide">
          Suggested Users
        </h2>
        <div className="overflow-y-auto mt-2 px-4 space-y-2 flex-1">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                key={suggestedUser?._id}
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex items-center p-2 rounded-lg bg-gray-800 hover:bg-gray-800 transition duration-300 cursor-pointer"
              >
                <Avatar className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-700">
                  <AvatarImage
                    src={suggestedUser?.profilePicture}
                    alt="Profile"
                  />
                  <AvatarFallback>{suggestedUser?.username[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                  <span className="block text-sm font-semibold">
                    {suggestedUser?.username}
                  </span>
                  <span
                    className={`text-xs ${
                      isOnline ? "text-green-400" : "text-gray-400"
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

      {/* Main Chat Section */}
      <section className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-gray-900">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedUser?.profilePicture} alt="Profile" />
                <AvatarFallback>{selectedUser?.username[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <span className="text-lg font-semibold">
                  {selectedUser?.username}
                </span>
              </div>
            </div>

            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto bg-gray-800 p-4">
              <Messages selectedUser={selectedUser} />
            </div>

            {/* Input Section */}
            <div className="flex items-center px-4 py-3 border-t border-gray-800 bg-gray-900">
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                className="flex-1 bg-gray-800 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <Button
                onClick={() => sendMessageHandler(selectedUser?._id)}
                className="ml-3 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg"
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <MessageCircleCode className="w-16 h-16 mb-4 text-gray-500" />
            <h2 className="text-lg font-bold mb-2">No Messages Yet</h2>
            <p className="text-gray-400">
              Select a user to start a conversation.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
