import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setAuthUser } from "@/redux/authSlice";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { FaMessage } from "react-icons/fa6";
import { IoLogOut, IoNotifications } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../assets/koselie-logo.jpg";

import axios from "axios";
import { Menu, SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreatePost from "../CreatePost";
import { Button } from "./button";
import { PopoverContent } from "./popover";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isLoggedIn = !!user; // Corrected condition

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/");
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
      setProfileDropdownOpen(!profileDropdownOpen);
    } else if (textType === "Messages") {
      navigate("/chat");
    } else if (textType === "Categories") {
      navigate("/category");
    } else if (textType === "View Profile") {
      navigate(`/profile/${user?._id}`);
    }
  };
  const profileDropdownItems = [
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="abc" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "View Profile",
    },

    { icon: <FaMessage className="text-gray-600 h-5 w-5" />, text: "Messages" },
    {
      icon: <IoNotifications className="text-gray-600 w-7 h-7" />,
      text: "Notifications",
    },
    { icon: <IoLogOut className="text-gray-600 w-7 h-7" />, text: "Logout" },
  ];

  const sidebarItems = [
    {
      icon: <MdAddBox className="text-black w-7 h-6" />,
      text: "Post",
    },

    // {
    //   icon: <BiSolidCategory className="text-black w-7 h-7" />,
    //   text: "Categories",
    // },
  ];

  return (
    <div>
      {/* Header for md and lg screens */}
      <div className="hidden md:flex fixed top-0 left-0 z-10 w-full bg-gradient-to-b from-purple-500 to-purple-600 text-black shadow-lg">
        <div className="flex items-center  w-full px-4 py-3 gap-2">
          {/* Left Section (Logo and Koselie) */}
          <Link to={"/"}>
            <div className="flex-1 flex items-center w-80 justify-center">
              <img className="h-10 w-10 rounded-full" src={logo} alt="" />
              <span className="ml-2 font-bold text-transparent bg-gradient-to-r from-yellow-500 via-pink-500 to-white bg-clip-text">
                Koselie
              </span>
            </div>
          </Link>

          {/* Middle Section (Google-Like Search Bar) */}
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center w-4/5 bg-white border border-gray-300 shadow-md rounded-md px-6 py-3">
              <SearchIcon className="text-gray-500 text-xl" />
              <input
                type="text"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none px-3"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Right Section (Navigation Items) */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {isLoggedIn ? ( // Corrected condition
              <>
                {/* Sidebar Items */}
                {sidebarItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => sidebarHandler(item.text)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-200"
                  >
                    <div className="text-lg text-blue-300">{item.icon}</div>
                    <span className="hidden lg:block font-medium text-black">
                      {item.text}
                    </span>
                  </div>
                ))}

                {/* User Profile */}
                <div className="relative">
                  <div
                    onClick={() => sidebarHandler("Profile")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-200"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={user?.profilePicture}
                        alt="Profile Picture"
                      />
                      <AvatarFallback>
                        {user?.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {user?.username || "User"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              // Fallback: Display the Login Button
              <div className="  flex gap-8">
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/signup")}>Signup</Button>
              </div>
            )}

            <div>
              {profileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  {profileDropdownItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        sidebarHandler(item.text);
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {item.icon}
                      <span className="text-sm text-gray-800">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for smaller screens */}
      <div className="fixed left-0 z-10 h-screen bg-gradient-to-b from-purple-500 to-purple-600 text-white shadow-lg md:hidden">
        <div className="flex items-center justify-center p-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-black"
          >
            {menuOpen ? (
              <X className="text-black" size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } h-full overflow-y-auto border-r border-gray-700`}
        >
          <div className="flex flex-col items-center px-4 pt-6">
            {isLoggedIn &&
              sidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => sidebarHandler(item.text)}
                  className="flex text-white items-center gap-4 p-3 my-2 w-full rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-200"
                >
                  <div className="text-lg text-blue-300">{item.icon}</div>
                  <span className="font-medium text-white">{item.text}</span>
                  {item.text === "Notifications" &&
                    likeNotification.length > 0 && (
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
                                      src={
                                        notification.userDetails?.profilePicture
                                      }
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

            {isLoggedIn && (
              <div className="relative w-full">
                <div
                  onClick={() => sidebarHandler("Profile")}
                  className="flex items-center gap-4 p-3 my-2 w-full rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-200"
                >
                  <div className="text-lg text-blue-300">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={user?.profilePicture} alt="abc" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="font-medium text-white">
                    {user?.username}
                  </span>
                </div>

                {profileDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-purple-400 rounded-md shadow-lg border border-gray-200 z-50">
                    {profileDropdownItems.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          sidebarHandler(item.text);
                          setProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.icon}
                        <span className="text-sm text-gray-800">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
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
