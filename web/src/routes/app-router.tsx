import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "@/private/layout.tsx";
import Dashboard from "@/pages/Dashboard.tsx";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {path: "", element: <Dashboard/>},
        ],
        errorElement: <Layout/>,
    }
]);

export function AppRouter() {
    return <RouterProvider router={appRouter}/>;
}