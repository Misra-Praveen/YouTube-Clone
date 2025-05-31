import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";

const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const VideoPage = lazy(() => import("./pages/VideoPage.jsx"));
const ChannelPage = lazy(() => import("./pages/ChannelPage.jsx"));
const UploadVideo = lazy(() => import("./pages/UploadVideo.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback="Loading..">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback="Loading..">
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback="Loading..">
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/video/:id",
        element: (
          <Suspense fallback="Loading...">
            <VideoPage />
          </Suspense>
        ),
      },
      {
        path: "/channel/me",
        element: (
          <Suspense fallback="Loading...">
            <ChannelPage />
          </Suspense>
        ),
      },
      {
        path: "/upload",
        element: (
          <Suspense fallback="Loading...">
            <UploadVideo />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
