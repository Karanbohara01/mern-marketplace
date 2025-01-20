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

  // return (

  //   <div className="flex  h-screen bg-gray-950">
  //     {/* Sidebar section */}
  //     <section className="  border-r border-white  px-6">
  //       {/* <h1 className="font-semibold ml-16 mb-5 text-2xl text-white">
  //         <span> {user?.username} </span>
  //       </h1> */}
  //       <h1 className="text-white text-center lg:ml-2 sm:ml-24 md:ml-24">
  //         Suggested Users
  //       </h1>

  //       {/* {/* <hr className="mb-6 w-full border-gray-300" /> */}
  //       <div className="overflow-y-auto mt-10  ">
  //         {suggestedUsers.map((suggestedUser) => {
  //           const isOnline = onlineUsers.includes(suggestedUser?._id);
  //           return (
  //             <div
  //               onClick={() => dispatch(setSelectedUser(suggestedUser))}
  //               className="flex gap-4 items-center p-3  rounded-lg hover:bg-gray-800 cursor-pointer  transition ease-in-out duration-300"
  //             >
  //               <Avatar className="w-12 h-12 bg-gradient-to-r from-green-500 via-indigo-600 to-purple-700 text-white flex justify-center items-center">
  //                 <AvatarImage src={suggestedUser?.profilePicture} />
  //                 <AvatarFallback>CN</AvatarFallback>
  //               </Avatar>
  //               <div className="flex flex-col">
  //                 <span className="font-semibold text-white">
  //                   {suggestedUser?.username}
  //                 </span>
  //                 <span
  //                   className={`text-xs font-semibold mt-1 ${
  //                     isOnline ? "text-green-500" : "text-white"
  //                   }`}
  //                 >
  //                   {isOnline ? "Active now" : "Offline"}
  //                 </span>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </section>

  //     {/* Main chat section */}
  //     {selectedUser ? (
  //       <section className="flex-1  mt-[68px] bg-white z-0 border-gray-300 flex flex-col h-full  shadow-lg">
  //         {/* <div className="flex gap-3 items-center px-6 py-4 border-b border-gray-300 sticky top-0 bg-gradient-to-r from-black to-black text-white z-10 ">
  //           <Avatar className="w-12 h-12">
  //             <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
  //             <AvatarFallback>CN</AvatarFallback>
  //           </Avatar>
  //           <div className="flex  flex-col">
  //             <span className=" font-semibold text-xl">
  //               {selectedUser?.username}
  //             </span>
  //           </div>
  //         </div> */}
  //         <Messages selectedUser={selectedUser} />
  //         <div className="flex items-center px-6 py-4 border-t border-t-gray-300">
  //           <Input
  //             value={textMessage}
  //             onChange={(e) => setTextMessage(e.target.value)}
  //             type="text"
  //             className="flex-1 bg-gray-200 text-white-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             placeholder="Type a message..."
  //           />
  //           <Button
  //             onClick={() => sendMessageHandler(selectedUser?._id)}
  //             className="ml-3 text-white bg-green-500 hover:bg-gray-700 p-2 rounded-md transition duration-300"
  //           >
  //             Send
  //           </Button>
  //         </div>
  //       </section>
  //     ) : (
  //       <div className="flex w-full flex-col items-center justify-center mx-auto text-white-600">
  //         <MessageCircleCode className="w-24 h-24 mb-6 text-white" />
  //         <h1 className="font-semibold text-2xl text-white mb-3">
  //           No Messages Yet
  //         </h1>
  //         <span className="text-white">
  //           Click on a user to start a conversation.
  //         </span>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Sidebar */}
      <section className="lg:w-1/4 md:w-1/3 w-full flex flex-col border-r border-gray-700 bg-gray-950 relative">
        {/* Logo and Title */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h1 className="text-lg font-bold">Koselie Chat</h1>
          <button className="lg:hidden block text-white">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Suggested Users */}
        <h2 className="mt-20 text-center text-sm font-semibold tracking-wide">
          Suggested Users
        </h2>
        <div className="overflow-y-auto mt-2 px-4 space-y-2 flex-1">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                key={suggestedUser?._id}
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex items-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300 cursor-pointer"
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
            <div className="flex items-center px-4 py-3 border-b border-gray-700 bg-gray-900">
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
            <div className="flex items-center px-4 py-3 border-t border-gray-700 bg-gray-900">
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                className="flex-1 bg-gray-700 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
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
