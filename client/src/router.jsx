import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./pages/Dashboard";
import DefaultLayout from "./components/DefaultLayout";

const router = createBrowserRouter([

    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
         
        ]
    },

    {
        path:'*',
        element:<NotFound/>
    }
]);

export default router;
