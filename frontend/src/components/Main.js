import React from 'react';

import {useGlobalContext} from "../Context/UserContext";
import axios from "axios";
import Main_NavBar from "./MiniComponents/Main_NavBar";
import Sidebar from "./MiniComponents/Sidebar";
import Company from "./MiniComponents/Company";

function Main(props) {
const {user} = useGlobalContext()

    console.log("user in main",user)

    if (!user) {
        return <div>Loading...</div>; // Or render a loading spinner
    }
    return (
        <>
            <Main_NavBar/>
            <div style={{display:"grid",gridTemplateColumns:"200px 1fr",marginTop:"4rem"}}>
                <Sidebar
                    image={user.image}/>
                <Company/>
            </div>


        </>

    );
}

export default Main;