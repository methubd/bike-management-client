import { createBrowserRouter } from "react-router-dom";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Error404 from "../components/ui/Error404";
import ProtectedRoute from "../components/layouts/ProtectedRote";
import ManageProduct from "../pages/Dashboard/Seller/ManageProduct";
import AddProduct from "../pages/Dashboard/Seller/AddProduct";
import SalesHistory from "../pages/Dashboard/Seller/SalesHistory";
import EditProducts from "../pages/Dashboard/Seller/EditProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                {" "}
                <DashboardLayout />{" "}
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <DashboardHome />,
            },
            {
                path: "/add-product",
                element: <AddProduct />,
            },
            {
                path: "/manage-product",
                element: <ManageProduct />,
            },
            {
                path: "/edit-product/:productId",
                element: <EditProducts />,
                loader: ({ params }) =>
                    fetch(
                        `http://localhost:5000/api/v1/products/${params.productId}`
                    ),
            },
            {
                path: "/sales-history",
                element: <SalesHistory />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "*",
        element: <Error404 />,
    },
]);
