import { MenuIcon, User, XIcon } from "lucide-react";
import { useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Users", href: "/admin/users" },
    { label: "Categories", href: "/admin/categories" },
    { label: "Products", href: "/admin/products" },
    { label: "Orders", href: "/admin/orders" },
  ];

  return (
    <div className="flex h-screen  dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed font-bold inset-y-0 left-0 transform bg-green-400 dark:bg-gray-800 shadow-md w-64 transition-transform duration-300 z-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            Admin Panel
          </span>
          <button
            className="md:hidden text-gray-700 dark:text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.label} className="mb-2">
                <Link
                  to={item.href}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 shadow-sm  dark:bg-gray-800 ">
          <button
            className="text-gray-700 dark:text-white md:hidden"
            onClick={toggleSidebar}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            Admin Dashboard
          </h1>
          <div className="relative">
            <button
              type="button"
              className="text-gray-700 flex gap-2 items-center justify-center mr-10  mt-4 dark:text-white focus:outline-none font-bold"
            >
              {/* Add a user profile or notification icon here */}
              <User />
              Karan
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto  md:ml-64 lg:ml-64">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to the Admin Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is the admin dashboard where you can manage users, categories,
            products, orders, and more.
          </p>
          {/* Replace with your custom dashboard widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                Total Users
              </h3>
              <FaPeopleGroup />
              <p className="text-2xl font-bold text-blue-500 mt-2">1,234</p>
            </div>
            <div className="p-4 bg-white flex  items-center  justify-center gap-4 dark:bg-gray-800 shadow rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700  dark:text-white">
                Manage Users
              </h3>
              <MdManageAccounts className="h-8 w-8 text-green-500" />
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                Total Products
              </h3>
              <p className="text-2xl font-bold text-green-500 mt-2">567</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                Total Orders
              </h3>
              <p className="text-2xl font-bold text-red-500 mt-2">89</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
