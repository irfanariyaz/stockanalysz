import React, {useEffect, useState} from 'react';
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import {useGlobalContext} from "../../Context/UserContext";
import company from "./Company";
import {Link, useNavigate} from "react-router-dom";

function MainNavBar(props) {
    const navigate = useNavigate();
  const {user,setCompanyDetails,setSearch,search,setUser}= useGlobalContext();
    const  handleSubmit = (e)=>{
        e.preventDefault();
        //fetch company overview  details
        const apiKey = "6ZC3AWD8JBACSWN0";
        const symbol = search;
        console.log("search symbol",search)
        const url =    `http://localhost:8080/api/stock/${search}`;
      //  const url = `https://www.alphavantage.co/query?function=OVERVIEW&apikey=${apiKey}&symbol=${search}`
        const response = axios.get(url);
        response.then((res)=>{
            setCompanyDetails(res.data);
            console.log("result",res.data)
            navigate("/user");
        })
        // console.log("data" +response.data)

        // console.log("stock"+data)


    }
    const handlelogout = ()=>{
        setUser({});
        //set the session storage back to null
        sessionStorage.setItem("user","");
        navigate("/");

    }
    const userisEmpty   = Object.keys(user).length;

    return (
        <nav className="main_navbar ">
            <div className="navbar-left">
                <span className="navbar-brand">STOCKANALYSZ</span>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input type="text" className="search-bar" name = "search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search..."/>
                    <button type="submit" className="search-button"><IoSearch  style={{
                        fontSize:"1.5rem",
                    }}/></button>
                </form>
            </div>
            <div className="navbar-center">
                <span className="navbar-brand">News</span>
                <span className="navbar-brand">Trade</span>
                <span className="navbar-brand">About</span>
                <span className="navbar-brand">Contact</span>

            </div>
            { userisEmpty === 0 ?
                <Link to="/login">
                    <button className="btn btn-primary">Login</button>
                </Link>
                :
                <button className="btn btn-primary" onClick={handlelogout}>Logout</button>

            }

        </nav>
    );
}

export default MainNavBar;