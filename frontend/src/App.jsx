// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { io } from "socket.io-client";
// import AdminDashboard from "./admin/AdminDashboard";
// import ManagePosts from "./admin/ManagePosts";
// import "./App.css";
// import CategoryList from "./components/CategoryList";
// import ChatPage from "./components/ChatPage";
// import Dashboard from "./components/Dashboard";
// import EditProfile from "./components/EditProfile";
// import ForgetPassword from "./components/ForgotPassword";
// import Home from "./components/Home";
// import MainLayout from "./components/MainLayout";
// import PostChatPage from "./components/PostChatPage";
// import ProtectedRoutes from "./components/ProctedRoutes";
// import CategoryBar from "./components/productsCategory/CategoryBar";
// import GroceryCategory from "./components/productsCategory/GroceryCategory";
// import Profile from "./components/Profile";
// import ResetPassword from "./components/ResetPassword";
// import SearchDemo from "./components/SearchDemo";
// import Sidebar from "./components/Sidebar";
// import Login from "./components/ui/Login";
// import Signup from "./components/ui/Signup";
// import VerifyEmail from "./components/VerifyEmail";
// import { setOnlineUsers } from "./redux/chatSlice";
// import { setLikeNotification } from "./redux/rtnSlice";
// import { setSocket } from "./redux/socketSlice";

// const browserRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },

//       {
//         path: "/profile/:id",
//         element: (
//           <ProtectedRoutes>
//             <Profile />
//           </ProtectedRoutes>
//         ),
//       },
//       {
//         path: "/account/edit",
//         element: (
//           <ProtectedRoutes>
//             {" "}
//             <EditProfile />
//           </ProtectedRoutes>
//         ),
//       },

//       {
//         path: "/chat",
//         element: (
//           <ProtectedRoutes>
//             <ChatPage />
//           </ProtectedRoutes>
//         ),
//       },
//       {
//         path: "/post-chat/:userId",
//         element: <PostChatPage />,
//       },

//       {
//         path: "/categorybar",
//         element: (
//           <ProtectedRoutes>
//             <CategoryBar />
//           </ProtectedRoutes>
//         ),
//       },

//       {
//         path: "/category",
//         element: (
//           <ProtectedRoutes>
//             <CategoryList />
//           </ProtectedRoutes>
//         ),
//       },
//       {
//         path: "/dashboard",
//         element: (
//           <ProtectedRoutes>
//             <AdminDashboard />
//           </ProtectedRoutes>
//         ),
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },

//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/dashboards",
//     element: <Dashboard />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgetPassword />,
//   },
//   { path: "/reset-password/:resetToken", element: <ResetPassword /> },

//   {
//     path: "/manage-post",
//     element: <ManagePosts />,
//   },

//   {
//     path: "/verify/:token",
//     element: <VerifyEmail />,
//   },

//   {
//     path: "/search",
//     element: <SearchDemo />,
//   },

//   {
//     path: "/grocery",
//     element: <GroceryCategory />,
//   },

//   {
//     path: "/sidebar",
//     element: <Sidebar />,
//   },

//   {
//     path: "/admin-dashboard",
//     element: (
//       <ProtectedRoutes>
//         <AdminDashboard />
//       </ProtectedRoutes>
//     ),
//   },
// ]);

// function App() {
//   const { user } = useSelector((store) => store.auth);
//   const { socket } = useSelector((store) => store.socketio);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (user) {
//       const socketio = io("http://localhost:8000", {
//         query: {
//           userId: user?._id,
//         },
//         transports: ["websocket"],
//       });
//       dispatch(setSocket(socketio));

//       // listen all the events
//       socketio.on("getOnlineUsers", (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });

//       socketio.on("notification", (notification) => {
//         dispatch(setLikeNotification(notification));
//       });

//       return () => {
//         socketio.close();
//         dispatch(setSocket(null));
//       };
//     } else if (socket) {
//       socket.close();
//       dispatch(setSocket(null));
//     }
//   }, [user, dispatch]);

//   return (
//     <>
//       <RouterProvider router={browserRouter} />
//     </>
//   );
// }

// export default App;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoutes from "./admin/AdminRoutes";
import ManagePosts from "./admin/ManagePosts";
import "./App.css";
import CategoryList from "./components/CategoryList";
import ChatPage from "./components/ChatPage";
import EditProfile from "./components/EditProfile";
import ForgetPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout";
import PostChatPage from "./components/PostChatPage";
import ProtectedRoutes from "./components/ProctedRoutes";
import CategoryBar from "./components/productsCategory/CategoryBar";
import GroceryCategory from "./components/productsCategory/GroceryCategory";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import Sidebar from "./components/Sidebar";
import Login from "./components/ui/Login";
import Signup from "./components/ui/Signup";
import VerifyEmail from "./components/VerifyEmail";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtnSlice";
import { setSocket } from "./redux/socketSlice";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/account/edit",
        element: (
          <ProtectedRoutes>
            <EditProfile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoutes>
            <ChatPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/post-chat/:userId",
        element: <PostChatPage />,
      },
      {
        path: "/categorybar",
        element: (
          <ProtectedRoutes>
            <CategoryBar />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/category",
        element: (
          <AdminRoutes>
            <CategoryList />
          </AdminRoutes>
        ),
      },
      // Admin routes (admin access only)
      {
        path: "/admin/dashboard",
        element: (
          <AdminRoutes>
            <AdminDashboard />
          </AdminRoutes>
        ),
      },
      {
        path: "/manage-post",
        element: (
          <AdminRoutes>
            <ManagePosts />
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  { path: "/reset-password/:resetToken", element: <ResetPassword /> },
  {
    path: "/verify/:token",
    element: <VerifyEmail />,
  },

  {
    path: "/grocery",
    element: (
      <ProtectedRoutes>
        <GroceryCategory />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/sidebar",
    element: (
      <ProtectedRoutes>
        <Sidebar />
      </ProtectedRoutes>
    ),
  },
]);

function App() {
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:8000", {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socketio));

      // Listen to events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
