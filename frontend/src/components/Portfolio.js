import React from 'react';
import Main_NavBar from "./MiniComponents/Main_NavBar";
import Sidebar from "./MiniComponents/Sidebar";
import Portfolio_Tab from "./MiniComponents/Portfolio_Tab";
import {useGlobalContext} from "../Context/UserContext";

function Portfolio(props) {

    return (
        <>
            <Main_NavBar/>
            <div style={{display: "grid", gridTemplateColumns: "200px 1fr", marginTop: "4rem"}}>
                <Sidebar/>
                <Portfolio_Tab/>
            </div>
        </>
)
    ;
}

export default Portfolio;