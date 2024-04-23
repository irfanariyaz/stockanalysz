import React from 'react';

import {useGlobalContext} from "../Context/UserContext";
import axios from "axios";
import Main_NavBar from "./MiniComponents/Main_NavBar";
import Sidebar from "./MiniComponents/Sidebar";
import Company from "./MiniComponents/Company";
import Overview from "./MiniComponents/Overview";

function Home(props) {
    const {user,userisPresent} = useGlobalContext()

    if (!user) {
        return <div>Loading...</div>; // Or render a loading spinner
    }
    return (
        <>
            <Main_NavBar/>
            <div style={{display:"grid",gridTemplateColumns:"200px 1fr",marginTop:"4rem"}}>
                <Sidebar
                    image={user.image}/>
                <Overview
                    userisPresent={userisPresent}/>
            </div>


        </>

    );
}

export default Home;