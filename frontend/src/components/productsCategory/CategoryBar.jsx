import axios from "axios";
import { MenuIcon } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  BiCategory,
  BiDish,
  BiHeart,
  BiJoystick,
  BiLaptop,
  BiShoppingBag,
  BiTrophy,
} from "react-icons/bi";
import { useSelector } from "react-redux";

// Lazy loaded components
const ClothesCategory = lazy(() => import("./ClothesCategory"));
const GroceryCategory = lazy(() => import("./GroceryCategory"));
const KidsCategory = lazy(() => import("./KidsCategory"));
const KitchenUtensilsCategory = lazy(() => import("./KitchenUtensilsCategory"));
const LaptopsCategory = lazy(() => import("./LaptopsCategory"));
const TechnologyCategory = lazy(() => import("./TechnologyCategory"));
const ToyCategory = lazy(() => import("./ToyCategory"));

const CategoryBar = () => {
  const { posts } = useSelector((store) => store.post);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Technology"); // Default selected category is "Technology"
  const API_URL = "http://localhost:8000/api/v1/category";

  // Validate if `posts` is an array and exists
  if (!Array.isArray(posts)) {
    return <div>No posts available.</div>;
  }

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      console.log("API Response:", response.data);
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("Unexpected API response structure:", response.data);
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err.message);
      setError(err.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setMenuOpen(false);
    setSelectedCategory(category);
  };

  const renderCategoryComponent = () => {
    const filteredPosts = posts.filter((post) =>
      post.category.some((cat) => cat.name === selectedCategory)
    );

    switch (selectedCategory) {
      case "Grocery":
        return (
          <Suspense
            fallback={<div className="text-center text-white">Loading...</div>}
          >
            <GroceryCategory posts={filteredPosts} />
          </Suspense>
        );
      case "Technology":
        return (
          <Suspense
            fallback={<div className="text-center text-white">Loading...</div>}
          >
            <TechnologyCategory posts={filteredPosts} />
          </Suspense>
        );
      case "Clothes":
        return (
          <Suspense
            fallback={<div className="text-center text-white">Loading...</div>}
          >
            <ClothesCategory posts={filteredPosts} />
          </Suspense>
        );
      case "Toys":
        return (
          <Suspense
            fallback={<div className="text-center text-white">Loading...</div>}
          >
            <ToyCategory posts={filteredPosts} />
          </Suspense>
        );
      case "Kids":
        return (
          <Suspense
            fallback={<div className="text-center text-white">Loading...</div>}
          >
            <KidsCategory posts={filteredPosts} />
          </Suspense>
        );
      case "Laptops":
        return (
          <Suspense
            fallback={<div className="text-center text-white">Loading...</div>}
          >
            <LaptopsCategory posts={filteredPosts} />
          </Suspense>
        );
      case "Kitchen utensils":
        return (
          <Suspense
            fallback={<div className="text-center text-white">Loading...</div>}
          >
            <KitchenUtensilsCategory posts={filteredPosts} />
          </Suspense>
        );
      default:
        return (
          <div className="flex items-center justify-center  text-center h-full">
            <h2 className="text-lg font-bold mb-2">
              {selectedCategory} category page is under development
            </h2>
          </div>
        );
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading categories...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-bold">
        Failed to load Categories: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center   bg-gray-100 mt-[100px] text-black">
      {/* Categories Bar - Horizontal on Large Screens, Sidebar on Small */}
      <section
        className={`  border-b border-gray-200 bg-white   
        ${menuOpen ? "w-full absolute top-0  z-50" : ""}`}
      >
        <div className="flex items-center justify-between px-4 py-3   lg:hidden md:hidden">
          <h1 className="text-lg mt-2 font-bold text-center min-w-full">
            Categories
          </h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden md:hidden block text-black"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
        <div
          className={`flex  overflow-x-auto  px-2  lg:px-4  ${
            menuOpen ? "hidden" : "block"
          } lg:flex md:flex `}
        >
          {categories.length > 0 &&
            categories.map((item) => (
              <div
                key={item._id}
                onClick={() => handleCategoryClick(item.name)}
                className={`flex items-center p-2 rounded-md hover:bg-gray-100 transition duration-200 cursor-pointer  whitespace-nowrap ${
                  selectedCategory === item.name ? "bg-gray-200" : ""
                }`}
                style={{ minWidth: "120px" }}
              >
                <div className="ml-2 flex items-center flex-1">
                  {/* Category Icons */}
                  {item.name === "Grocery" && (
                    <BiShoppingBag className="mr-1 text-gray-500" />
                  )}
                  {item.name === "Technology" && (
                    <BiCategory className="mr-1 text-gray-500" />
                  )}
                  {item.name === "Clothes" && (
                    <BiHeart className="mr-1 text-gray-500" />
                  )}
                  {item.name === "Toys" && (
                    <BiJoystick className="mr-1 text-gray-500" />
                  )}
                  {item.name === "Kids" && (
                    <BiTrophy className="mr-1 text-gray-500" />
                  )}
                  {item.name === "Laptops" && (
                    <BiLaptop className="mr-1 text-gray-500" />
                  )}
                  {item.name === "Kitchen utensils" && (
                    <BiDish className="mr-1 text-gray-500" />
                  )}
                  <span className="block text-gray-800 text-sm font-medium">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 z-50 h-full  bg-white text-black shadow-lg lg:hidden md:hidden ${
            menuOpen ? "w-full" : "w-0"
          } transition-all duration-300 overflow-hidden`}
        >
          <div className="flex items-center justify-between px-4 py-3  border-b border-gray-200">
            <h1 className="text-lg mt-2 font-bold text-center min-w-full">
              Categories
            </h1>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden md:hidden block text-black"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="h-full overflow-y-auto border-r border-gray-800">
            <div className="flex flex-col  mt-2 ">
              {categories.length > 0 &&
                categories.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleCategoryClick(item.name)}
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 transition duration-200 cursor-pointer  whitespace-nowrap `}
                  >
                    <div className="ml-2 flex items-center flex-1">
                      {/* Category Icons */}
                      {item.name === "Grocery" && (
                        <BiShoppingBag className="mr-1 text-gray-500" />
                      )}
                      {item.name === "Technology" && (
                        <BiCategory className="mr-1 text-gray-500" />
                      )}
                      {item.name === "Clothes" && (
                        <BiHeart className="mr-1 text-gray-500" />
                      )}
                      {item.name === "Toys" && (
                        <BiJoystick className="mr-1 text-gray-500" />
                      )}
                      {item.name === "Kids" && (
                        <BiTrophy className="mr-1 text-gray-500" />
                      )}
                      {item.name === "Laptops" && (
                        <BiLaptop className="mr-1 text-gray-500" />
                      )}
                      {item.name === "kitchen utils" && (
                        <BiDish className="mr-1 text-gray-500" />
                      )}
                      <span className="block text-gray-800 text-sm font-medium">
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section
        className="flex-1 flex flex-col p-4 overflow-y-auto"
        style={{ minWidth: "280px" }}
      >
        {/* Category Header  */}
        <div className="flex justify-between items-center  mb-3  border-b border-gray-200 py-2">
          <h2 className="text-xl font-semibold text-gray-900 capitalize">
            {selectedCategory}
          </h2>
        </div>
        {/* Category Content */}
        <div className="flex-1 ">{renderCategoryComponent()}</div>
      </section>
    </div>
  );
};

export default CategoryBar;
