import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setAuthUser } from "@/redux/authSlice";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { BiSolidCategory } from "react-icons/bi";
import { FaMessage } from "react-icons/fa6";
import { IoLogOut, IoNotifications } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";

import axios from "axios";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreatePost from "../CreatePost";
import { Button } from "./button";
import { PopoverContent } from "./popover";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Post") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    } else if (textType === "Categories") {
      navigate("/category");
    }
  };

  const sidebarItems = [
    { icon: <AiFillHome className="text-black w-6 h-6" />, text: "Home" },
    // { icon: <Search />, text: "Search" },
    // { icon: <TrendingUp />, text: "Explore" },
    { icon: <FaMessage className="text-black h-5 w-5" />, text: "Messages" },
    {
      icon: <IoNotifications className="text-black w-7 h-7" />,
      text: "Notifications",
    },
    { icon: <MdAddBox className="text-black w-7 h-6" />, text: "Post" },

    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="abc" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },

    {
      icon: <BiSolidCategory className="text-black w-7 h-7" />,
      text: "Categories",
    },
    { icon: <IoLogOut className="text-black w-7 h-7" />, text: "Logout" },
  ];

  return (
    <div className="fixed   left-0 z-10 h-screen bg-gradient-to-b from-green-400 to-green-500 text-white shadow-lg">
      {/* Hamburger Menu Toggle */}
      <div className="flex items-center   justify-center p-4 md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black hover:text-black "
        >
          {menuOpen ? (
            <X className="text-black text-center font-bold " size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>
      {/* Sidebar Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block h-full overflow-y-auto border-r border-gray-700`}
      >
        {/* <span>
          <h1 className="m-2 ml-7 text-black -mb-16   text-2xl font-bold">
            Koselie
          </h1>
        </span> */}

        <div className="flex flex-col items-center md:items-start px-4 pt-6">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => sidebarHandler(item.text)}
              className="flex items-center gap-4 p-3 my-2 w-full rounded-lg transition-all duration-200 cursor-pointer hover:bg-green-200 hover:scale-105"
            >
              <div className="text-lg text-blue-300">{item.icon}</div>
              <span className="hidden md:block font-medium text-black">
                {item.text}
              </span>
              {item.text === "Notifications" && likeNotification.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full h-4 w-4 bg-red-600 text-xs font-bold flex items-center justify-center absolute left-6"
                    >
                      {likeNotification.length}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border border-gray-600 text-gray-200">
                    <div className="p-2">
                      {likeNotification.length === 0 ? (
                        <p className="text-sm">No new notifications</p>
                      ) : (
                        likeNotification.map((notification) => (
                          <div
                            key={notification.userId}
                            className="flex items-center gap-3 my-2 p-2 bg-gray-700 rounded-lg"
                          >
                            <Avatar>
                              <AvatarImage
                                src={notification.userDetails?.profilePicture}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-semibold text-white">
                                {notification.userDetails?.username}
                              </span>{" "}
                              liked your post
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* CreatePost Component */}
      <div className="absolute bottom-4 w-full flex justify-center">
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default LeftSidebar;
