// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { io } from "socket.io-client";
// import AdminDashboard from "./admin/AdminDashboard";
// import "./App.css";
// import CategoryList from "./components/CategoryList";
// import ChatPage from "./components/ChatPage";
// import EditProfile from "./components/EditProfile";
// import Home from "./components/Home";
// import MainLayout from "./components/MainLayout";
// import ProtectedRoutes from "./components/ProctedRoutes";
// import Profile from "./components/Profile";
// import Sidebar from "./components/Sidebar";
// import Login from "./components/ui/Login";
// import Signup from "./components/ui/Signup";
// import { setOnlineUsers } from "./redux/chatSlice";
// import { setLikeNotification } from "./redux/rtnSlice";
// import { setSocket } from "./redux/socketSlice";
// const browserRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoutes>
//         <MainLayout />
//       </ProtectedRoutes>
//     ),
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
//         path: "/category",
//         element: (
//           <ProtectedRoutes>
//             <CategoryList />
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
//     path: "/sidebar",
//     element: <Sidebar />,
//   },

//   {
//     path: "/signup",
//     element: <Signup />,
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
import "./App.css";
import CategoryList from "./components/CategoryList";
import ChatPage from "./components/ChatPage";
import EditProfile from "./components/EditProfile";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout";
import ProtectedRoutes from "./components/ProctedRoutes";
import Profile from "./components/Profile";
import SearchDemo from "./components/SearchDemo";
import Sidebar from "./components/Sidebar";
import Login from "./components/ui/Login";
import Signup from "./components/ui/Signup";
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
            {" "}
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
        path: "/category",
        element: (
          <ProtectedRoutes>
            <CategoryList />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <AdminDashboard />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/search",
    element: <SearchDemo />,
  },

  {
    path: "/sidebar",
    element: <Sidebar />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoutes>
        <AdminDashboard />
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

      // listen all the events
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
