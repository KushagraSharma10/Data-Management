import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserForm from "./components/UserForm.jsx";


let router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/user/create",
    element: <UserForm />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
