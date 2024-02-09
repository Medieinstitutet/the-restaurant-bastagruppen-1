import { createBrowserRouter } from "react-router-dom";
import { PageNotFound } from "./pages/PageNotFound";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Booking } from "./pages/Booking";
import { Administrative } from "./pages/Administrative";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/admin",
        element: <Administrative />,
      },
    ],
  },
]);
