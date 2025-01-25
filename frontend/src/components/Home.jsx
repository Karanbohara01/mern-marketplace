import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import { Outlet } from "react-router-dom";
import Feed from "./Feed";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <>
      <div className="flex items-center flex-col bg-gray-500">
        <div className="flex bg-gray-300">
          <div className="flex-grow ">
            <Feed />
            <Outlet />
          </div>
        </div>
        <div className="text-white ">{/* <RightSidebar /> */}</div>
      </div>
    </>
  );
};

export default Home;
