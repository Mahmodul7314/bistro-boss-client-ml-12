import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/signUp/SignUp";
import Secret from './../Pages/Secret/Secret';
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from './AdminRoute';
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from './../Pages/Dashboard/Payment/PaymentHistory/PaymentHistory';

   export const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
   children:[
    {
      path:'/'  ,
      element:<Home></Home>
    },
    {
      path:'/menu',
      element:<Menu></Menu>
    },
    {
      path:"/order/:category",
      element:<Order></Order>
    },
    {
      path:"/login",
      element:<Login></Login>
    },
    {
      path:"/signup",
      element:<SignUp></SignUp>
    },
    {
      path:"/secret",
      element:<PrivateRoute><Secret></Secret></PrivateRoute>
    }
   ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        //normal user routes
        {
          path:'cart',
          element:<Cart></Cart>
        },
        {
          path:'payment',
          element: <Payment></Payment>

        },
        {
          path:'paymentHistory',
          element: <PaymentHistory></PaymentHistory>

        },
        // admin only Routes
         {
          path:'addItems',
          element:<AdminRoute><AddItems></AddItems></AdminRoute>
         },
         {
          path:'manageItems',
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
         },
         {
          path:'updateItem/:id',
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader:({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
        },
        {
          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        }

      ]
    }
  ]);