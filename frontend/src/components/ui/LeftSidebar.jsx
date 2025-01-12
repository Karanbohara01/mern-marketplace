import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setAuthUser } from "@/redux/authSlice";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import axios from "axios";
import {
  CastIcon,
  Heart,
  LucideLogOut,
  Menu,
  MessageCircleMore,
  PlusIcon,
  X,
} from "lucide-react";
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
    }
  };

  const sidebarItems = [
    { icon: <AiFillHome />, text: "Home" },
    // { icon: <Search />, text: "Search" },
    // { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircleMore />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusIcon />, text: "Post" },

    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="abc" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LucideLogOut />, text: "Logout" },
    { icon: <CastIcon />, text: "Categories" },
  ];

  return (
    <div className="fixed top-0 left-0 z-10 h-screen bg-gray-950 text-white">
      {/* Hamburger Menu Toggle */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block h-full  border-r border-gray-700`}
      >
        <div className="flex flex-col items-center md:items-start">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => sidebarHandler(item.text)}
              className="flex items-center gap-3 p-3 my-3 text-green-600 rounded-lg cursor-pointer hover:bg-gray-700"
            >
              <div className="text-lg">{item.icon}</div>
              <span className="hidden md:block ">{item.text}</span>
              {item.text === "Notifications" && likeNotification.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute  left-6"
                    >
                      {likeNotification.length}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div>
                      {likeNotification.length === 0 ? (
                        <p>No new notification</p>
                      ) : (
                        likeNotification.map((notification) => {
                          return (
                            <div
                              key={notification.userId}
                              className="flex items-center gap-2 my-2"
                            >
                              <Avatar>
                                <AvatarImage
                                  src={notification.userDetails?.profilePicture}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <p className="text-sm">
                                <span className="font-bold">
                                  {notification.userDetails?.username}
                                </span>{" "}
                                liked your post
                              </p>
                            </div>
                          );
                        })
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
      <div className="absolute bottom-4 w-full">
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default LeftSidebar;
