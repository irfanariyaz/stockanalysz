import React, {useState} from 'react';
import "./main.css"
import {flushSync} from "react-dom";
import {useGlobalContext} from "../../Context/UserContext";
import button from "bootstrap/js/src/button";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import PortfolioSummary from "./PortfolioSummary";
function PortfolioTab(props) {
    const [portfolioSelected,setportfolioSelected] = useState({});
    const [portfolioName,setPortfolioName] = useState("");
    const [showmodel,setshowModel] = useState(false);
    const {userisPresent,user,setUser} = useGlobalContext();
    const navigate = useNavigate();
    const handleSetPortfolio = (portfolioname)=>{
        //get thr portfolio to display
        const portfolio = user.portfolios.filter((portfolio)=>portfolio.name === portfolioname );
        setportfolioSelected(portfolio[0]);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        //call backend api to create  the portfolio
        axios.post(`http://localhost:8080/api/addportfolio/${user.id}/${portfolioName}`)
            .then((res)=>{
                console.log("res after creating a portfolio",res.data.portfolios)
                handleSetPortfolio(portfolioName);
                setUser(res.data);
                navigate("/portfolio");
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
                        Select Portfolio
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {userisPresent && (user?.portfolios.map((portfolio)=> {
                            return <li  key={portfolio.id} onClick={()=>handleSetPortfolio(portfolio.name)}><a className="dropdown-item" href="#">{portfolio.name}</a></li>

                        }))}
                    </ul>
                </div>
                {/*// <-- Button trigger modal -->*/}
                <button type="button" className="btn btn-primary"  onClick={()=>setshowModel(true)}>
                    Create new Portfolio
                </button>

            </div>
            <hr/>
            {/*// <-- Modal -->*/}
            {showmodel && userisPresent &&
                <div className="portfolio_modal">
                    <form onSubmit={handleSubmit}>
                        <input className="modal-input" type="text" name="portfolio-name"
                               id="portfolio-name" value={portfolioName}
                               onChange={(e) => setPortfolioName(e.target.value)}/>
                        <button type="submit" className="btn btn-primary mx-4">Create</button>
                    </form>
                    <br/><hr/>
                </div>
            }
            {/*if no user , show them to login*/}
            {showmodel && !userisPresent &&
                <div>
                    <p>Login to create a Portfolio</p>
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            }
            {/*{Summary of portfolio}*/}
            <div>
                <PortfolioSummary
                    portfolioSelected={portfolioSelected}/>
            </div>
            {/*{Portfolio table}*/}
            <div></div>
        </div>
    );
}

export default PortfolioTab;