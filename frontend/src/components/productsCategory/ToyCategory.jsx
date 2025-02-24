import { useSelector } from "react-redux";

const ToyCategory = () => {
  const { posts } = useSelector((store) => store.post);

  // Convert posts object to an array
  const postsArray = Object.values(posts);

  console.log("Posts Array:", postsArray); // Debug: Check if postsArray is populated

  // Filter posts with the "grocery" category (case-insensitive)
  const groceryPosts = postsArray.filter((post) =>
    post?.category?.some((cat) => cat.name.toLowerCase() === "toys")
  );

  console.log("Filtered Grocery Posts:", groceryPosts); // Debug: Check if filtering works

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen bg-gray-100">
      <div className="flex-1 lg:my-20 lg:w-full md:w-full md:my-20 px-8 sm:mx-20 md:px-16">
        {groceryPosts.length > 0 ? (
          <div className="mb-5">
            {/* Grid layout for products */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-auto pb-3 p-2">
              {groceryPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
                >
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {post.caption}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-gray-900">
                        ${post.price}
                      </span>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
                        See more...
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-800 text-lg font-bold">
              No posts under category Grocery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToyCategory;
