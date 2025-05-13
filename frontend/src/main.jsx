import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { LocalizationProvider } from '@mui/x-date-pickers';
// If you are using date-fns v3.x or v4.x, please import `AdapterDateFns`
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserForm from "./components/UserForm.jsx";
import BlogTable from "./components/BlogTable";


let router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/user/create",
    element: <UserForm />
  },
  {
    path: "/user/:userId",
    element: <UserForm />
  },
  {
    path: "/blogs",
    element: <BlogTable />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <LocalizationProvider dateAdapter={AdapterDateFns}>
     <RouterProvider router={router} />
     </LocalizationProvider>
  </StrictMode>,
)
