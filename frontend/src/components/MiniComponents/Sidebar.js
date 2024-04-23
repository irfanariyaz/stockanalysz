import React from 'react';
import { HiOutlineHome } from "react-icons/hi2";
import { PiBriefcaseMetal } from "react-icons/pi";
import {useGlobalContext} from "../../Context/UserContext";
import {Link} from "react-router-dom";

function Sidebar(props) {
    const {user,userisPresent} = useGlobalContext();
    console.log("user in sidebar",user)
    return (
        <div className="sidebar">
            {/*//show userprofile only if user present*/}
            {!userisPresent ?
                <div className="user-profile">

                </div>
                :
                <div className="user-profile">
                    <img src={`/images/${user.image}`} alt="Profile Picture" className="profile-pic"/>
                    <div className="user-details">
                        <p className="username">{user.username}</p>
                        <p className="email">{user.email}</p>
                    </div>
                </div>


            }

            <ul className="navigation">
                <li><Link to="/"><HiOutlineHome className="icons"/> Home</Link></li>
                <li><Link to="/portfolio"><PiBriefcaseMetal className="icons"/>Portfolio</Link></li>
                <li><Link to="/wishlist"><PiBriefcaseMetal className="icons"/>Wishlist</Link></li>
                <li><a href="#"><PiBriefcaseMetal className="icons"/>Profile</a></li>
                <li><a href="#"><PiBriefcaseMetal className="icons"/>New Features</a></li>
                <li><a href="#"><PiBriefcaseMetal className="icons"/>New Features</a></li>



            </ul>

        </div>
    )
        ;
}

export default Sidebar;