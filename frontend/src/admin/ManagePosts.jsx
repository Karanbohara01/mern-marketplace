// import useGetAllPost from "@/hooks/useGetAllPost";
// import { setPosts, setSelectedPost } from "@/redux/postSlice";
// import axios from "axios";
// import { MdDelete } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";

// const ManagePosts = () => {
//   const dispatch = useDispatch();
//   const { posts } = useSelector((store) => store.post); // Access posts from Redux store
//   const { user } = useSelector((store) => store.auth); // Access logged-in user

//   useGetAllPost(); // Fetch posts

//   // Handle post deletion
//   const handleDeletePost = async (postId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:8000/api/v1/post/delete/${postId}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         // Update the Redux store to remove the deleted post
//         const updatedPostData = posts.filter((post) => post._id !== postId);
//         dispatch(setPosts(updatedPostData));

//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Error deleting post");
//     }
//   };

//   // Handle selecting a post (for editing, if needed in the future)
//   const handleSelectPost = (post) => {
//     // Dispatch an action to set the selected post (if you want to edit it)
//     dispatch(setSelectedPost(post));
//   };

//   return (
//     <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
//         Manage Posts
//       </h2>
//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
//           <thead className="bg-gray-100 dark:bg-gray-700">
//             <tr>
//               <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                 Author
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                 Post Name
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                 Description
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                 Total Posts
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                 Price
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                 Location
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="py-4 px-6 text-center text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//             {posts && posts.length > 0 ? (
//               posts.map((post) => (
//                 <tr
//                   key={post._id}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
//                 >
//                   <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
//                     <div className="flex items-center space-x-3">
//                       <span>{post.author?.username || "Unknown"}</span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
//                     {post.caption || "Untitled"}
//                   </td>
//                   <td className="py-4 px-6 text-gray-700 dark:text-gray-300 max-w-xs truncate">
//                     {post.description || "No description"}
//                   </td>
//                   <td className="py-4 px-6 text-gray-700 dark:text-gray-300 max-w-xs truncate">
//                     {setSelectedPost.length || "No description"}
//                   </td>
//                   <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
//                     Rs. {post.price || "N/A"}
//                   </td>
//                   <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
//                     {post.location || "N/A"}
//                   </td>
//                   <td className="py-4 px-6">
//                     <span
//                       className={`px-3 py-1 text-sm font-semibold rounded-full ${
//                         post.status === "Available"
//                           ? "bg-green-400 text-black"
//                           : "bg-green-100 text-black"
//                       }`}
//                     >
//                       {post.status || "Available"}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6 text-center">
//                     <div className="flex items-center justify-center space-x-3">
//                       <button
//                         className="p-2 text-red-600 flex items-center gap-3 hover:bg-red-50 rounded-lg transition-colors"
//                         onClick={() => handleDeletePost(post._id)}
//                         aria-label="Delete Post"
//                       >
//                         Delete
//                         <MdDelete className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="py-6 px-6 text-center text-gray-600 dark:text-gray-400"
//                 >
//                   <div className="flex flex-col items-center justify-center space-y-4">
//                     <span className="text-2xl font-semibold">
//                       No posts available
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       Create a new post to get started.
//                     </span>
//                     <div className="mt-4">
//                       <button
//                         className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//                         onClick={() => alert("Redirect to create post page")}
//                       >
//                         Create New Post
//                       </button>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManagePosts;

import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ManagePosts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.post); // Access posts from Redux store
  const { user } = useSelector((store) => store.auth); // Access logged-in user

  const [showDialog, setShowDialog] = useState(false); // State to handle the visibility of the confirmation dialog
  const [postToDelete, setPostToDelete] = useState(null); // State to store the post that is going to be deleted

  // Handle post deletion
  const handleDeletePost = async (postId) => {
    setShowDialog(true); // Show the confirmation dialog
    setPostToDelete(postId); // Store the post ID to delete
  };

  // Confirm deletion
  const confirmDeletePost = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${postToDelete}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        // Update the Redux store to remove the deleted post
        const updatedPostData = posts.filter(
          (post) => post._id !== postToDelete
        );
        dispatch(setPosts(updatedPostData));

        toast.success(res.data.message);
      }
      setShowDialog(false); // Hide the confirmation dialog after the deletion
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting post");
      setShowDialog(false); // Hide the dialog if there is an error
    }
  };

  // Cancel deletion
  const cancelDeletePost = () => {
    setShowDialog(false); // Hide the dialog without deleting
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Manage Posts
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Author
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Post Name
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Total Posts
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Location
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="py-4 px-6 text-center text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts && posts?.length > 0 ? (
              posts.map((post) => (
                <tr
                  key={post._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center space-x-3">
                      <span>{post.author?.username || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                    {post.caption || "Untitled"}
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                    {post.description || "No description"}
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                    {post.posts?.length || "No posts"}
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                    Rs. {post.price || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                    {post.location || "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        post.status === "Available"
                          ? "bg-green-400 text-black"
                          : "bg-green-100 text-black"
                      }`}
                    >
                      {post.status || "Available"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        className="p-2 text-red-600 flex items-center gap-3 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDeletePost(post._id)}
                        aria-label="Delete Post"
                      >
                        Delete
                        <MdDelete className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 px-6 text-center text-gray-600 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <span className="text-2xl font-semibold">
                      No posts available
                    </span>
                    <span className="text-sm text-gray-500">
                      Create a new post to get started.
                    </span>
                    <div className="mt-4">
                      <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => alert("Redirect to create post page")}
                      >
                        Create New Post
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-700">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={cancelDeletePost}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                onClick={confirmDeletePost}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
