// import useGetUserProfile from "@/hooks/useGetUserProfile";
// import { Heart, MessageCircle } from "lucide-react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import Rating from "./Rating";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// const Profile = () => {
//   const { id: userId } = useParams();
//   useGetUserProfile(userId);
//   const [activeTab, setActiveTab] = useState("posts");
//   const { userProfile, user } = useSelector((store) => store.auth);

//   const isLoggedInUserProfile = user?._id === userProfile?._id;
//   const isFollowing = false;

//   const handleTabChange = (tab) => setActiveTab(tab);

//   const displayedPosts =
//     activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

//   const renderPostGrid = (posts) => {
//     if (!posts || posts.length === 0) {
//       return (
//         <div className="text-gray-500 text-center mt-10">
//           No Listings Found.
//         </div>
//       );
//     }

//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {posts.map((post) => (
//           <Card
//             key={post?._id}
//             className="group relative cursor-pointer text-black hover:shadow-md transition-shadow duration-200"
//           >
//             <div className="relative rounded-md overflow-hidden">
//               <img
//                 src={post.image}
//                 alt="postimage"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="absolute bottom-0 right-0 bg-purple-600 bg-opacity-60 p-2 text-white text-sm font-bold">
//                 NPR. {post?.price}
//               </div>
//             </div>

//             <CardContent className="p-4 space-y-2">
//               <CardTitle className="text-base font-medium truncate">
//                 {post?.caption}
//               </CardTitle>
//               <p className="text-gray-600 text-sm truncate">
//                 {post.description}
//               </p>

//               <div className="flex items-center justify-between text-gray-500 text-sm">
//                 <div className="flex items-center gap-2">
//                   <Heart
//                     size={16}
//                     className="hover:text-gray-700 transition-colors"
//                   />
//                   <span>{post?.likes.length}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MessageCircle
//                     size={16}
//                     className="hover:text-gray-700 transition-colors"
//                   />
//                   <span>{post?.comments.length}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   };
//   return (
//     <div className="flex max-w-6xl lg:mt-12 md:mt-14 mt-0  justify-center  mx-auto px-4">
//       <div className="flex flex-col gap-8 p-4 sm:p-8 w-full">
//         {/* Profile Header */}
//         <Card className="shadow-md bg-gray-50">
//           <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-6">
//             <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
//               <AvatarImage
//                 src={userProfile?.profilePicture}
//                 alt="profilephoto"
//               />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>

//             <div className="flex flex-col gap-2">
//               <CardTitle className="text-xl font-bold">
//                 {userProfile?.username}
//               </CardTitle>
//               <Badge className="text-black bg-purple-500 flex items-center justify-center p-1 rounded-sm text-md">
//                 Bio | {userProfile?.bio || "No bio available..."}
//               </Badge>
//               {/* <Badge className="w-fit" variant="secondary">
//                 <span className="pl-1">{userProfile?.username}</span>
//               </Badge> */}
//               <span className="text-yellow-400">
//                 <Rating />
//               </span>
//             </div>

//             <div className="flex items-center gap-2">
//               {isLoggedInUserProfile ? (
//                 <Link to="/account/edit">
//                   <Button
//                     variant="secondary"
//                     className="bg-purple-500 hover:bg-purple-600 h-8 text-sm"
//                   >
//                     Edit profile
//                   </Button>
//                 </Link>
//               ) : isFollowing ? (
//                 <div className="flex gap-2">
//                   <Button variant="secondary" className="h-8 text-sm">
//                     Unfollow
//                   </Button>
//                   <Button variant="secondary" className="h-8 text-sm">
//                     Message
//                   </Button>
//                 </div>
//               ) : (
//                 <Button className="bg-[#9800f6] hover:bg-[#9800f6] h-8 text-sm">
//                   Follow
//                 </Button>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent className="p-4 space-y-2">
//             <p className="flex items-center">
//               <span className="font-bold text-base">Listings</span>
//               <span className="font-semibold text-gray-700 p-2">
//                 ({userProfile?.posts?.length || 0})
//               </span>
//             </p>
//           </CardContent>
//         </Card>

//         <div className="border-t border-t-gray-200">
//           <div className="flex items-center justify-center gap-10 text-sm">
//             <span
//               className={`py-3 cursor-pointer text-black ${
//                 activeTab === "posts" ? "font-bold" : ""
//               }`}
//               onClick={() => handleTabChange("posts")}
//             >
//               Listings
//             </span>
//             {isLoggedInUserProfile && (
//               <span
//                 className={`py-3 cursor-pointer text-black ${
//                   activeTab === "saved" ? "font-bold" : ""
//                 }`}
//                 onClick={() => handleTabChange("saved")}
//               >
//                 Saved
//               </span>
//             )}
//           </div>

//           {renderPostGrid(displayedPosts)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Rating from "./Rating";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Profile = () => {
  const { id: userId } = useParams();
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("listings");
  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const handleTabChange = (tab) => setActiveTab(tab);

  const displayedPosts =
    activeTab === "listings" ? userProfile?.posts : userProfile?.bookmarks;

  const renderPostGrid = (posts) => {
    if (!posts || posts.length === 0) {
      return (
        <div className="text-gray-500 text-center mt-10">
          No Listings Found.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Card
            key={post?._id}
            className="group relative cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative rounded-md overflow-hidden">
              <img
                src={post.image}
                alt="postimage"
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-gray-800 bg-opacity-75 text-white text-sm px-3 py-1 rounded-tr-md">
                NPR. {post?.price}
              </div>
            </div>

            <CardContent className="p-4 space-y-2">
              <CardTitle className="text-base font-medium truncate">
                {post?.caption}
              </CardTitle>
              <p className="text-gray-600 text-sm truncate">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <Button size="sm" variant="secondary" className="text-xs">
                  View Details
                </Button>
                <span className="text-gray-500 text-xs">
                  {post?.availability || "In Stock"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex flex-col gap-8">
        {/* Profile Header */}
        <Card className="shadow-md bg-white">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-6">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profilephoto"
              />
              <AvatarFallback>
                {userProfile?.username?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2">
              <CardTitle className="text-2xl font-bold">
                {userProfile?.username}
              </CardTitle>
              <p className="text-sm text-gray-600">
                Bio: {userProfile?.bio || "Not Specified"}
              </p>
              <Rating value={userProfile?.rating || 0} />
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {isLoggedInUserProfile ? (
                <Link to="/account/edit">
                  <Button
                    variant="secondary"
                    className="h-8 text-white bg-purple-600 text-sm"
                  >
                    Edit Profile
                  </Button>
                </Link>
              ) : (
                <Button className="bg-blue-600 hover:bg-blue-700 h-8 text-sm">
                  Contact Seller
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Listings Tabs */}
        <div className="border-t border-gray-200 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10 text-sm mt-4">
              <span
                className={`py-3 cursor-pointer ${
                  activeTab === "listings"
                    ? "font-bold border-b-2 border-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => handleTabChange("listings")}
              >
                Active Listings
              </span>
              {isLoggedInUserProfile && (
                <span
                  className={`py-3 cursor-pointer ${
                    activeTab === "archived"
                      ? "font-bold border-b-2 border-blue-600"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleTabChange("archived")}
                >
                  Archived Listings
                </span>
              )}
            </div>

            {isLoggedInUserProfile && (
              <Link to="/listings/new">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Add New Listing
                </Button>
              </Link>
            )}
          </div>

          {/* Render Listings */}
          {renderPostGrid(displayedPosts)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
