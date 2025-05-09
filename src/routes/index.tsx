import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../layouts";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductsList from "../pages/product/ProductsList";
import UserList from "../pages/user/UserList";
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
    ],
  },
]);
export default router;
