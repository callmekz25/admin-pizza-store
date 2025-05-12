import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../layouts";
import Dashboard from "../pages/dashboard/dashboard";
import ProductsList from "../pages/product/products-list";
import UserList from "../pages/user/users-list";
import AddProduct from "../pages/product/add-product";
import UpdateProduct from "../pages/product/update-product";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Dashboard />
          </Suspense>
        ),
        path: "/",
      },
      {
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsList />
          </Suspense>
        ),
        path: "/products",
      },
      {
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <UserList />
          </Suspense>
        ),
        path: "/users",
      },
      {
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <AddProduct />
          </Suspense>
        ),
        path: "/add-product",
      },
      {
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <UpdateProduct />
          </Suspense>
        ),
        path: "/products/:id",
      },
    ],
  },
]);
export default router;
