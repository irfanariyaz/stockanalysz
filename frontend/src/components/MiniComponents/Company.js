import React, {useState} from 'react';
import "./main.css"
import {useGlobalContext} from "../../Context/UserContext";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import PortfolioModal from "../Modal/PortfolioModal";
import button from "bootstrap/js/src/button";
import axios from "axios";

function Company() {
    const {companyDetails,userisPresent,user,setUser}=useGlobalContext();
    // const [modalPort,setModalPort] = useState(false);
    console.log("companyDetails is set",companyDetails);

    console.log(userisPresent,user)
    const addtoPortfolio = (portfolioId)=>{
        const stock_id = companyDetails?.id;
        axios.post(`http://localhost:8080/api/addStock/${stock_id}/${portfolioId}`)
            .then((res)=>{
                console.log("response after adding the stock to the portfolio",res.data)
                setUser(res.data)
                // navigate("/portfolio");
            })
            .catch((e)=>
            console.log("ERROR",e))
    }

    if(!companyDetails){
        return <p>Loading</p>
    }else
    {
        return (
            <div className="company_container">
                <div className="">
                    <div className="d-flex justify-content-between">
                        <div className=" company_header">
                            <h2 className="">{companyDetails.Name}({companyDetails.Symbol})</h2>
                            <p>{companyDetails.Exchange}- Currency in {companyDetails.Currency}</p>
                        </div>
                        <div className="">
                            {/*//dropdown for portfolios*/}
                            <button className="btn btn-secondary dropdown-toggle mx-4" type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Add to  Portfolio
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {userisPresent && (user?.portfolios.map((portfolio) => {
                                    return <li key={portfolio.id} className="dropdown-item"
                                                                     href="#" onClick={()=>addtoPortfolio(portfolio.id)}>{portfolio.name} </li>

                                }))}
                            </ul>
                            {/*//dropdown for portfolios*/}
                            <button className="btn btn-secondary dropdown-toggle mx-4" type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Add to Wishlist
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {userisPresent && (user?.wishlists.map((wishlist) => {
                                    return <li key={wishlist.id}><a className="dropdown-item"
                                                                     href="#">{wishlist.name}</a></li>

                                }))}
                            </ul>

                        </div>
                    </div>
                    <div>
                        <h1>${parseFloat(companyDetails.price).toFixed(2)}
                            <span
                                className={parseFloat(companyDetails.changePercent).toFixed(2) < 0 ? "negative bold m-lg-2" : "positive bold m-lg-2"}>({parseFloat(companyDetails.changePercent).toFixed(2)}%)
                         <span>{parseFloat(companyDetails.changePercent).toFixed(2) < 0 ?
                             <BsArrowDown className="negative arrow_icon "/> :
                             <BsArrowUp className="positive  arrow_icon"/>}</span></span>
                        </h1>

                    </div>

                    <hr/>
                    <ul className="data-options">
                        <li>Overview</li>
                        <li>Financials</li>
                        <li>Fundementals</li>
                        <li>Cash Flow</li>
                    </ul>
                    <hr/>
                    <div className="company-details">
                        <div className="company-details-left">
                            <p>EPS <span>{companyDetails.EPS}</span></p>
                            <p>PE Ratio <span>{companyDetails.PERatio}</span></p>
                            <p>Market Cap <span>{companyDetails.MarketCapitalization}</span></p>
                            <p>Book Value <span>{companyDetails.BookValue}</span></p>
                            <p>Target Price <span>{companyDetails.AnalystTargetPrice}</span></p>
                            <p>Forward PE <span>8.15</span></p>
                            <p>Divident per share <span>{companyDetails.DividendPerShare}</span></p>

                        </div>
                        <div className="divider"></div>
                        <div className="company-details-right">
                            <p>Asset type <span>8.15</span></p>
                            <p>Sector <span>{companyDetails.Sector}</span></p>
                            <p>Industry <span>{companyDetails.Industry}</span></p>
                            <p> Beta<span>{companyDetails.Beta}</span></p>
                            <p>FiscalYearEnd <span>{companyDetails.FiscalYearEnd}</span></p>
                            <p>ExDivident Date <span>{companyDetails.ExDividendDate}</span></p>
                            <p>Address <span>{companyDetails.Address}</span></p>
                        </div>
                        <div className="divider"></div>
                        <div className="">
                            <div className="analysis"></div>
                            <div className="analysis"></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Company;