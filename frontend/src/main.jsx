import { createBrowserRouter, RouterProvider } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
// If you are using date-fns v3.x or v4.x, please import `AdapterDateFns`
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserForm from "./components/UserForm.jsx";
import BlogTable from "./components/BlogTable";
import BlogForm from "./components/BlogForm";
import UserTable from "./components/UserTable";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",  
    element: <UserTable />,
  },
  {
    path: "/users/create",
    element: <UserForm mode="create" />,
  },
  {
    path: "/users/view/:userId",
    element: <UserForm mode="view" />,
  },
  {
    path: "/users/edit/:userId",
    element: <UserForm mode="edit" />,
  },
  {
    path: "/blogs",
    element: <BlogTable />,
  },
  {
    path: "/blogs/create",
    element: <BlogForm />,
  },
  {
    path: "/blogs/edit/:blogId",
    element: <BlogForm mode="edit" />,
  },
  {
    path: "/blogs/view/:blogId",
    element: <BlogForm mode="view" />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </StrictMode>
);
