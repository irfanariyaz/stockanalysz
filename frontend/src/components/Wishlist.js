import React from 'react';
import Main_NavBar from "./MiniComponents/Main_NavBar";
import Sidebar from "./MiniComponents/Sidebar";
import Wishlist_tab from "./MiniComponents/Wishlist_tab";

function Wishlist(props) {
    return (
        <>
            <Main_NavBar/>
            <div style={{display: "grid", gridTemplateColumns: "200px 1fr", marginTop: "4rem"}}>
                <Sidebar/>
                <Wishlist_tab/>
            </div>
        </>
    );
}

export default Wishlist;