// import { useSelector } from "react-redux";

// const KitchenUtensilsCategory = () => {
//   const { posts } = useSelector((store) => store.post);

//   // Convert posts object to an array
//   const postsArray = Object.values(posts);

//   console.log("Posts Array:", postsArray); // Debug: Check if postsArray is populated

//   // Filter posts with the "grocery" category (case-insensitive)
//   const groceryPosts = postsArray.filter((post) =>
//     post?.category?.some((cat) => cat.name.toLowerCase() === "kitchen utensils")
//   );

//   console.log("Filtered Grocery Posts:", groceryPosts); // Debug: Check if filtering works

//   return (
//     <div className="flex flex-col md:flex-row justify-center min-h-screen bg-gray-800">
//       <div className="flex-1 lg:my-20 lg:w-full md:w-full md:my-20 px-8 sm:mx-20 md:px-16">
//         {groceryPosts.length > 0 ? (
//           <div className="mb-5">
//             {/* Grid layout for products */}
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-auto pb-3 p-2">
//               {groceryPosts.map((post) => (
//                 <div
//                   key={post._id}
//                   className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
//                 >
//                   <img
//                     src={post.image}
//                     alt={post.caption}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold text-gray-800">
//                       {post.caption}
//                     </h3>
//                     <p className="text-gray-600 text-sm mt-2">
//                       {post.description}
//                     </p>
//                     <div className="flex items-center justify-between mt-4">
//                       <span className="text-lg font-bold text-gray-900">
//                         ${post.price}
//                       </span>
//                       <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
//                         See more...
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="flex justify-center items-center h-full">
//             <p className="text-gray-800 text-lg font-bold">
//               No posts under category Grocery.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default KitchenUtensilsCategory;

const KitchenUtensilsCategory = ({ posts }) => {
  // Filter posts with the "kitchen utensils" category (case-insensitive)
  const kitchenPosts = posts?.filter((post) =>
    post?.category?.some(
      (cat) => cat.name?.toLowerCase() === "kitchen utensils"
    )
  );

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen bg-gray-100  text-black">
      <div className="flex-1  px-4 sm:px-6 md:px-8 py-6 ">
        {kitchenPosts?.length > 0 ? (
          <div className="mb-5">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  overflow-x-auto pb-3 p-2">
              {kitchenPosts?.map((post) => (
                <div
                  key={post?._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="relative  aspect-square">
                    <img
                      src={post?.image}
                      alt={post?.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {post?.caption}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {post?.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-md font-bold text-gray-900">
                        ${post?.price}
                      </span>
                      <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300 text-sm">
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
              No posts under this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenUtensilsCategory;
