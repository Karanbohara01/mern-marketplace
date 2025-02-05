import { Button } from "@/components/ui/button";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { BiCategory, BiGroup } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/koselie-logo.jpg";
import CategoryList from "../components/CategoryList";
import ManagePosts from "./ManagePosts";
import ManageUsers from "./ManageUsers";

const AdminDashboard = () => {
  useGetAllUsers();
  useGetAllPost();

  const users = useSelector((state) => state.auth.users);
  const posts = useSelector((state) => state.post.posts);
  const { user } = useSelector((store) => store.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("dashboard");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { label: "Dashboard", content: "dashboard" },
    { label: "Users", content: "users" },
    { label: "Categories", content: "categories" },
    { label: "posts", content: "posts" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-sm z-30 transform transition-transform duration-300 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            "md:translate-x-0"
          )}
        >
          {/* Logo and Brand */}
          <div className="flex items-center justify-center h-20 shadow-sm dark:bg-gray-900">
            <Link to="/">
              <img className="h-10 w-auto mr-2" src={logo} alt="Koselie Logo" />
              <span className="font-bold text-xl">Koselie</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6">
            <ul>
              {navItems.map((item) => (
                <li key={item.label} className="mb-2">
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center w-full py-3 px-10 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white rounded-md transition-colors duration-200",
                      activeContent === item.content
                        ? "bg-black text-white dark:bg-black dark:text-gray-100"
                        : "text-gray-700 dark:text-black"
                    )}
                    onClick={() => {
                      setActiveContent(item.content);
                      setIsSidebarOpen(false);
                    }}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Backdrop for Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Content Area */}
        <div className="flex flex-col flex-1 md:ml-64">
          {/* Header */}
          <header className="flex items-center h-20 justify-between px-6 py-3 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
            {/* Mobile Menu Button */}
            <button
              className="text-gray-500 dark:text-gray-400 md:hidden focus:outline-none"
              onClick={toggleSidebar}
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  className="rounded-full h-8 w-8 font-bold"
                  src={user?.profilePicture}
                  alt={user?.username}
                />
                <AvatarFallback className="font-bold">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-bold">{user?.username}</span>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            {/* Dashboard Content */}
            {activeContent === "dashboard" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Welcome to the Admin Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Manage your site content and user activity.
                </p>

                {/* Dashboard Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Total Users
                      </h3>
                      <p className="text-2xl font-bold text-blue-500 mt-2">
                        {users?.length}
                      </p>
                    </div>
                    <FaPeopleGroup className="text-2xl text-blue-500" />
                  </div>

                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Total Posts
                      </h3>
                      <p className="text-2xl font-bold text-green-500 mt-2">
                        {posts?.length}
                      </p>
                    </div>
                    <MdManageAccounts className="text-2xl text-green-500" />
                  </div>

                  <div
                    className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center justify-between cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setActiveContent("categories")}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Manage Categories
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Edit, add, or delete categories.
                      </p>
                    </div>
                    <BiCategory className="text-2xl text-yellow-500" />
                  </div>
                  <div
                    className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center justify-between cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setActiveContent("users")}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Manage Users
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Edit, add, or delete users.
                      </p>
                    </div>
                    <BiGroup className="text-2xl text-yellow-500" />
                  </div>
                </div>
              </>
            )}

            {activeContent === "categories" && <CategoryList />}
            {activeContent === "posts" && <ManagePosts />}
            {activeContent === "users" && <ManageUsers />}
            {/* {activeContent === "users" && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage user accounts and permissions here.
                </p>
              </div> */}
            {/* )} */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
