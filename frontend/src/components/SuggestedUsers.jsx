import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <>
      <div className="my-10">
        <div className="flex items-center justify-between text-sm">
          <h1 className="font-semibold text-gray-600">Suggested for you</h1>
          <span className="font-medium cursor-pointer">See All</span>
        </div>

        {/* Container for users with grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-5 my-5">
          {suggestedUsers?.map((user) => (
            <div
              key={user._id}
              className="flex flex-col items-center justify-between"
            >
              <Link to={`/profile/${user._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="profile_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div className="text-center mt-2">
                <h1 className="font-semibold text-sm">
                  <Link to={`/profile/${user._id}`}>{user?.username}</Link>
                </h1>
                <span className="text-gray-600 text-sm">
                  {user?.bio || "Bio here..."}
                </span>
              </div>
              <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6] mt-2">
                Follow
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SuggestedUsers;
