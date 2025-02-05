import { setSelectedUser } from "@/redux/authSlice";
import { setMessages } from "@/redux/chatSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";
import { MessageCircleCode, Smile } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const SuggestedUserItem = ({ suggestedUser, onlineUsers, dispatch }) => {
  const isOnline = onlineUsers.includes(suggestedUser?._id);

  const handleClick = () => {
    dispatch(setSelectedUser(suggestedUser));
  };

  return (
    <div
      key={suggestedUser?._id}
      onClick={handleClick}
      className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition duration-200 cursor-pointer"
    >
      <Avatar className="w-10 h-10 bg-gradient-to-r from-green-500 via-purple-600 to-pink-700">
        <AvatarImage src={suggestedUser?.profilePicture} alt="Profile" />
        <AvatarFallback>{suggestedUser?.username[0]}</AvatarFallback>
      </Avatar>
      <div className="ml-3 flex-1">
        <span className="block text-sm font-medium text-gray-800">
          {suggestedUser?.username}
        </span>
        <span
          className={`text-xs ${isOnline ? "text-green-500" : "text-gray-500"}`}
        >
          {isOnline ? "Active now" : "Offline"}
        </span>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sendMessageHandler = async (receiverId) => {
    if (!textMessage.trim()) return; // Prevent sending empty messages
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
      e.preventDefault(); // Prevent default behavior (e.g., new line)
      sendMessageHandler(selectedUser?._id);
    }
  };

  const memoizedSuggestedUsers = useMemo(() => {
    return suggestedUsers.map((suggestedUser) => (
      <SuggestedUserItem
        key={suggestedUser?._id}
        suggestedUser={suggestedUser}
        onlineUsers={onlineUsers}
        dispatch={dispatch}
      />
    ));
  }, [suggestedUsers, onlineUsers, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null)); // Reset selectedUser on unmount
    };
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <section className="lg:w-1/4 md:w-1/3 w-full flex flex-col border-r border-gray-200 bg-white relative">
        {/* Logo and Title */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h1 className="text-lg font-bold text-center min-w-full mt-20 text-gray-800">
            Koselie Chat
          </h1>
        </div>

        {/* Suggested Users */}
        <h2 className="mt-4 text-center text-sm font-semibold tracking-wide text-gray-600">
          Suggested Users
        </h2>
        <div className="overflow-y-auto mt-2 px-4 space-y-1 flex-1">
          {memoizedSuggestedUsers}
        </div>
      </section>

      {/* Main Chat Section */}
      <section className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-white">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedUser?.profilePicture} alt="Profile" />
                <AvatarFallback>{selectedUser?.username[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <span className="text-lg font-semibold text-gray-800">
                  {selectedUser?.username}
                </span>
              </div>
            </div>

            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-4">
              <Messages selectedUser={selectedUser} />
            </div>

            {/* Input Section */}
            <div className="flex items-center px-4 py-3 border-t border-gray-200 bg-white">
              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="mr-2 px-2 hover:bg-gray-100 rounded-md"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 border-none shadow-md">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </PopoverContent>
              </Popover>
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                onKeyDown={handleKeyDown}
                className="flex-1 bg-gray-50 text-gray-800 p-2 rounded-lg border focus-visible:ring-transparent"
                placeholder="Type a message..."
              />
              <Button
                onClick={() => sendMessageHandler(selectedUser?._id)}
                className="ml-3 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                disabled={isSending || !textMessage.trim()} // Disable if sending or message is empty
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <MessageCircleCode className="w-16 h-16 mb-4 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-700 mb-2">
              No Messages Yet
            </h2>
            <p className="text-gray-500">
              Select a user to start a conversation.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
