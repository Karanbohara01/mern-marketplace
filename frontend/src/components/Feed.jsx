import { useSelector } from "react-redux";
import Post from "./Post";

const Feed = () => {
  const { posts } = useSelector((store) => store.post);

  // Category name mapping
  const categoryNameMap = {
    Kids: "Kids' Fashion",
    technology: "Technology Gadgets",
    "kitchen utils": "Kitchen Utensils",
    electronics: "Electronics",
    clothes: "Apparel",
    grocery: "Grocery & Essentials",
    toys: "Toys & Games",
  };

  // Group posts by category name
  const groupedPosts = posts.reduce((acc, post) => {
    post.category.forEach((cat) => {
      const categoryName = cat.name;
      const mappedCategoryName = categoryNameMap[categoryName] || categoryName;

      if (!acc[mappedCategoryName]) {
        acc[mappedCategoryName] = [];
      }
      acc[mappedCategoryName].push(post);
    });
    return acc;
  }, {});

  return (
    <div className="flex flex-col md:flex-row   justify-center min-h-screen">
      {/* Sidebar - Adjust this part based on your sidebar component */}
      {/* Main content (Feed) */}
      <div className="flex-1 lg:my-20 lg:w-screen  md:w-screen md:my-20 px-8 sm:mx-20 md:px-16">
        {Object.entries(groupedPosts).map(([categoryName, postsInCategory]) => (
          <div key={categoryName} className="mb-5">
            <h2 className="text-2xl font-semibold mb-3 flex items-center w-full p-2 text-white">
              {categoryName}
            </h2>
            <hr className=" " /> <hr className="bg-red-500" />
            <hr className="bg-blue-600" />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 overflow-x-auto pb-3 p-2">
              {postsInCategory.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
