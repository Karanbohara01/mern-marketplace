import { useSelector } from "react-redux";
import Post from "./Post";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);

  // Validate if `posts` is an array
  if (!Array.isArray(posts)) {
    return <div>No posts available.</div>;
  }

  // Log posts for debugging
  console.log(posts);

  // Filter out posts with invalid or missing `_id`
  const validPosts = posts.filter((post) => post && post._id);

  // Show message if no valid posts exist
  if (validPosts.length === 0) {
    return <div>No valid posts available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mr-10 tex-white   sm:grid-cols-1  lg:grid-cols-4 gap-6 p-6">
      {validPosts.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
