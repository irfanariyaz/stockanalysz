
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/MiniComponents/Footer";
import LandingPage from "./components/LandingPage";

import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import Portfolio from "./components/Portfolio";
import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Wishlist from "./components/Wishlist";


function App() {
    const router = createBrowserRouter([
        {
            path:"/",
            element: <Main/>
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
        },
        {
            path:"/wishlist",
            element: <Wishlist/>
        }
    ]);
  return (
    // <div className="App">
    //   {/*Navbar*/}
    //     <Navbar />
    //     <LandingPage />
    //     <Footer />
    // </div>
      <RouterProvider router={router} />
  );
}

export default App;
