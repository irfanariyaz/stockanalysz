import React, {useState} from 'react';
import {useGlobalContext} from "../../Context/UserContext";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import button from "bootstrap/js/src/button";
import PortfolioSummary from "./PortfolioSummary";
import WishlistSummary from "./WishlistSummary";

function WishlistTab(props) {
    const [wishlistSelected,setwishlistSelected] = useState({});
    const [wishlistName,setWishlistName] = useState("");
    const [showmodel,setshowModel] = useState(false);
    const {userisPresent,user,setUser} = useGlobalContext();
    const navigate = useNavigate();
    const handleSetPortfolio = (wishlistName)=>{
        //get thr portfolio to display
        const wishlist = user?.wishlists.filter((wishlist)=>wishlist.name === wishlistName );
        setwishlistSelected(wishlist[0]);
        console.log("wishlistName,wishlistSelected",wishlistName,wishlistSelected)
    }
    console.log("wishlist selected after rendering wishlist",wishlistSelected)
    const handleSubmit = (e)=>{
        e.preventDefault();
        //call backend api to create  the portfolio
        axios.post(`http://localhost:8080/api/addwishlist/${user.id}/${wishlistName}`)
            .then((res)=>{
                console.log("res after creating a wishlist",res.data.wishlists)
                handleSetPortfolio(wishlistName);
                setUser(res.data);
                navigate("/wishlist");
            })
        //set

        setshowModel(false)

    }
    return (
        <div className="portfolio_container">
            {/*//portfolio buttons*/}

            <div className="d-flex gap-5 mb-3">
                {/*create a dropdown for portfolio selection*/}
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                        Select Wishlist
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {userisPresent && (user?.wishlists.map((wishlist)=> {
                            return <li  key={wishlist.id} onClick={()=>handleSetPortfolio(wishlist.name)}><a className="dropdown-item" href="#">{wishlist.name}</a></li>

                        }))}
                    </ul>
                </div>
                {/*// <-- Button trigger modal -->*/}
                <button type="button" className="btn btn-primary"  onClick={()=>setshowModel(true)}>
                    Create new Wishlist
                </button>

            </div>
            <hr/>
            {/*// <-- Modal -->*/}
            {showmodel && userisPresent &&
                <div className="portfolio_modal">
                    <form onSubmit={handleSubmit}>
                        <input className="modal-input" type="text" name="portfolio-name"
                               id="portfolio-name" value={wishlistName}
                               onChange={(e) => setWishlistName(e.target.value)}/>
                        <button type="submit" className="btn btn-primary mx-4">Create</button>
                    </form>
                    <br/><hr/>
                </div>
            }
            {/*if no user , show them to login*/}
            {showmodel && !userisPresent &&
                <div>
                    <p>Login to create a Wishlist</p>
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            }
            {/*{Summary of portfolio}*/}
            {wishlistSelected && <div>
                <WishlistSummary
                    wishlistSelected={wishlistSelected}/>
            </div>}


        </div>
    );
}

export default WishlistTab;