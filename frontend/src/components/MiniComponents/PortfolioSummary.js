import React, {useState} from 'react';
import axios from "axios";
import {useGlobalContext} from "../../Context/UserContext";
import {useNavigate} from "react-router-dom";
import button from "bootstrap/js/src/button";

function PortfolioSummary({showUpdateModal,portfolioSelected,
                              showDeleteModal,setShowDeleteModal,
                              setportfolioSelected,setShowUpdateModal}) {

    const[name ,setName ] = useState("");
    const {setUser,user} = useGlobalContext();
    const navigate = useNavigate();
   // console.log("portfolioSelected in summary",portfolioSelected)
    const handleDelete = (stock_id)=>{
           // setportfolio(portfolioSelected)
        axios.delete(`http://localhost:8080/api/delete/portfolioStock/${stock_id}/${portfolioSelected.id}`)
            .then((res)=>{
                setUser(res.data);
                const name = portfolioSelected.name;
                const port= res.data.portfolios?.filter((portfolio)=>portfolio.name === name );
                setportfolioSelected(port[0])
            })
    }

console.log("portfolioSelected",portfolioSelected)
    const handleUpdate=(e)=>{
        e.preventDefault();
        const data = {
            name:name,
            id:portfolioSelected.id
        }
        axios.put(`http://localhost:8080/api/update/Portfolio`,null,{
            params: data
        })
        .then((res)=>{
            console.log(res.data);
            const port= res.data.portfolios?.filter((portfolio)=>portfolio.name === name );
            setportfolioSelected(port[0])
            setUser(res.data);
        })
        setShowUpdateModal(false);
    }
    const handleDeletePortfolio = ()=>{
        const user_id = user.id;
        axios.delete(`http://localhost:8080/api/delete/${user_id}/${portfolioSelected.id}`)
            .then((res)=>{
                console.log(res.data);
                setportfolioSelected("");
               setUser(res.data);
            })
            .catch((e)=>{
                console.log("Error ",e);
        })
        setShowDeleteModal(false);

        navigate("/portfolio")
    }


        return (<>

            {portfolioSelected &&
            <div>
                <div className="d-flex justify-content-between">
                    <h1 className="fs-2" style={{textTransform: "Capitalize",}}>{(portfolioSelected?.name)}</h1>
                    <div>
                        <button className="btn btn-info mx-2" onClick={() => setShowUpdateModal(true)}>Edit portfolio
                        </button>
                        <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Delete portfolio
                        </button>
                    </div>

                </div>
                {(showUpdateModal) &&
                    <form onSubmit={handleUpdate}>
                        <input className="modal-input" type="text" name="portfolio-name"
                               id="portfolio-name" value={name} placeholder={portfolioSelected.name}
                               onChange={(e) => setName(e.target.value)}/>
                        <button type="submit" className="btn btn-primary mx-4">Update</button>
                    </form>
                }
                {(showDeleteModal) &&
                    <div className="overlay d-flex justify-content-center align-items-center flex-column">
                        <h4>Do you want to delete "<span
                            style={{textTransform: "Capitalize", color: "#BBA3A3FF"}}>{portfolioSelected.name}</span>" ?
                        </h4>
                        <button type="submit" className="btn btn-danger" onClick={handleDeletePortfolio}>Ok</button>
                    </div>
                }
                <hr/>
                <h4 className="mb-3">Overview</h4>
                <table className="table table-striped w-50 ">
                    <tbody>
                    <tr>
                        <td>Total Value</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Active Investment</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Total Gain/Loss</td>
                        <td>-</td>
                    </tr>
                    </tbody>

                </table>
                <hr/>
                <table className="table table-striped table-bordered ">
                    <thead className="">
                    <tr>
                        <th>Symbol</th>
                        <th>Current price</th>
                        <th>EPS</th>
                        <th>Shares</th>
                        <th>Gain/Loss</th>
                        <th>BookValue</th>
                        <th>% of portfolio</th>
                        <th>Buy/Sell</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {portfolioSelected?.stocks?.map(stock => (
                        <tr key={stock.id}>
                            <td>{stock.Symbol}</td>
                            <td>${parseFloat(stock.price).toFixed(2)}</td>
                            <td>{stock.EPS}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>{stock.BookValue}</td>
                            <td>-</td>
                            <td>
                                <button className="btn btn-secondary mx-2">Buy
                                </button>
                                <button className="btn btn-dark">Sell
                                </button>

                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(stock.id)}>Delete
                                </button>
                            </td>
                        </tr>

                    ))}

                    </tbody>
                </table>
            </div>
            }
        </>)
}

export default PortfolioSummary;