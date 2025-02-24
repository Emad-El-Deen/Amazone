import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Products from ".//Components/Products/Products.jsx"
export default function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "brands",
          // element: <Brands />,
        },
        {
          path: "categories",
          // element: <Categories />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "shippingAddress/:cartId",
          // element: <ShippingAddress />,
        },
        {
          path: "productDetails/:id/",
          // element: <ProductDetails />,
        },
        {
          path: "cart",
          // element: <Cart />,
        },
        {
          path: "login",
          // element: <Login />,
        },
        {
          path: "register",
          // element: <Register />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
