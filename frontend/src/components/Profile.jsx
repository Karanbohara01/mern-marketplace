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

  // Depending on the active tab, display posts or bookmarks
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
        {posts.map((post, index) => {
          // If post is just an ID (or not an object), show a placeholder.
          if (typeof post !== "object" || post === null) {
            return (
              <div key={index} className="text-center text-gray-500">
                Post details not available.
              </div>
            );
          }

          // If the image field is not a full URL, construct one.
          const imageUrl =
            post.image && post.image.startsWith("http")
              ? post.image
              : `http://localhost:8000/uploads/${post.image}`;

          return (
            <Card
              key={post._id}
              className="group relative cursor-pointer hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative rounded-md overflow-hidden">
                <img
                  src={imageUrl}
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
          );
        })}
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
                    className="h-8 text-white hover:bg-black bg-black text-sm"
                  >
                    Edit Profile
                  </Button>
                </Link>
              ) : (
                <Button className="bg-black hover:bg-gray-700 h-8 text-sm">
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
                    : "text-gray-800"
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
                      : "text-gray-800"
                  }`}
                  onClick={() => handleTabChange("archived")}
                >
                  Archived Listings
                </span>
              )}
            </div>
            {isLoggedInUserProfile && (
              <Link to="/listings/new">
                <Button className="bg-black hover:bg-gray-600">
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
