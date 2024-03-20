import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Portfolio from "./Portfolio";

function Router(props) {
    const router = createBrowserRouter([
        {
            path: "/",
            element:<App/>,
        },
        {
            path:"/login",
            element:<Login />
        },
        {
            path:"/register",
            element:<Register/>
        },
        {
            path:"/user",
            element: <Main/>
        },
        {
            path:"/portfolio",
            element: <Portfolio/>
        }
    ]);
    return (
        <div></div>
    );
}

export default Router;