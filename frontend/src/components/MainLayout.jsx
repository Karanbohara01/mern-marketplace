import { Outlet } from "react-router-dom";
import LeftSidebar from "./ui/LeftSidebar";

const MainLayout = () => {
  return (
    <div className="">
      {/* <Header /> */}
      <LeftSidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
