// export default ChatPage;

import { setSelectedUser } from "@/redux/authSlice";
import { setMessages } from "@/redux/chatSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";
import { MessageCircleCode, Search, Send, Smile } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const SuggestedUserItem = ({
  suggestedUser,
  onlineUsers,
  dispatch,
  isSelected,
}) => {
  const isOnline = onlineUsers.includes(suggestedUser?._id);

  const handleClick = () => {
    dispatch(setSelectedUser(suggestedUser));
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-4 rounded-xl transition duration-300 cursor-pointer
        ${
          isSelected
            ? "bg-black/5 border-2 border-black"
            : "hover:bg-gray-50 border-2 border-transparent"
        }`}
    >
      <div className="relative">
        <Avatar className="w-12 h-12 ring-2 ring-offset-2 ring-black">
          <AvatarImage src={suggestedUser?.profilePicture} alt="Profile" />
          <AvatarFallback className="bg-gradient-to-br from-black to-gray-700">
            {suggestedUser?.username[0]}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-700 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="ml-4 flex-1">
        <span className="block text-sm font-semibold text-black">
          {suggestedUser?.username}
        </span>
        <span
          className={`text-xs ${
            isOnline ? "text-green-700 font-medium" : "text-gray-500"
          }`}
        >
          {isOnline ? "Active now" : "Offline"}
        </span>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const filteredUsers = useMemo(() => {
    return suggestedUsers.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, suggestedUsers]);

  const sendMessageHandler = async (receiverId) => {
    if (!textMessage.trim()) return;
    setIsSending(true);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${receiverId}`,
        { message: textMessage },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...(messages || []), res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
      alert("Error sending message");
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

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <section className="lg:w-1/4 md:w-1/3 w-full flex flex-col bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-black text-center">
            Koselie Chat
          </h1>
        </div>

        <div className="px-4 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-black focus:border-black"
            />
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Suggested Users
          </h2>
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {filteredUsers.map((suggestedUser) => (
              <SuggestedUserItem
                key={suggestedUser?._id}
                suggestedUser={suggestedUser}
                onlineUsers={onlineUsers}
                dispatch={dispatch}
                isSelected={selectedUser?._id === suggestedUser?._id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Chat Section */}
      <section className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            <div className="flex items-center px-6 py-4 border-b border-gray-200 bg-white">
              <Avatar className="w-12 h-12 ring-2 ring-offset-2 ring-black">
                <AvatarImage src={selectedUser?.profilePicture} alt="Profile" />
                <AvatarFallback className="bg-gradient-to-br from-black to-gray-700">
                  {selectedUser?.username[0]}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <span className="text-lg font-semibold text-gray-900">
                  {selectedUser?.username}
                </span>
                <p className="text-sm text-gray-500">
                  {onlineUsers.includes(selectedUser?._id)
                    ? "Active now"
                    : "Offline"}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <Messages selectedUser={selectedUser} />
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                <Popover
                  open={showEmojiPicker}
                  onOpenChange={setShowEmojiPicker}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="hover:bg-gray-100 rounded-lg p-2"
                    >
                      <Smile className="h-6 w-6 text-gray-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border-none shadow-xl">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </PopoverContent>
                </Popover>

                <Input
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border-0 focus-visible:ring-0 bg-transparent text-gray-900"
                  placeholder="Type your message..."
                />

                <Button
                  onClick={() => sendMessageHandler(selectedUser?._id)}
                  className={`rounded-lg px-4 py-2 ${
                    isSending || !textMessage.trim()
                      ? "bg-gray-200 text-gray-500"
                      : "bg-black hover:bg-gray-800 text-white"
                  }`}
                  disabled={isSending || !textMessage.trim()}
                >
                  {isSending ? "Sending..." : <Send className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50">
            <div className="p-8 rounded-2xl bg-white shadow-sm border border-gray-200">
              <MessageCircleCode className="w-16 h-16 mb-4 text-black mx-auto" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No Conversation Selected
              </h2>
              <p className="text-gray-500 text-center">
                Choose a user from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
