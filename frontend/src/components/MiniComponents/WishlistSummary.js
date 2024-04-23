import React from 'react';
import {useGlobalContext} from "../../Context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function WishlistSummary({wishlistSelected,setwishlistSelected}) {
    const {setUser} = useGlobalContext();
    const navigate = useNavigate();
    const handleDelete = (stock_id)=>{
        setwishlistSelected(wishlistSelected)
        axios.delete(`http://localhost:8080/api/delete/wishlistStock/${stock_id}/${wishlistSelected.id}`)
            .then((res)=>{
                setUser(res.data);
                const name = wishlistSelected.name;
                const list= res.data.wishlists?.filter((wishlist)=>wishlist.name === name );
                setwishlistSelected(list[0])
            })
    }
    return (
        <div>
            <h1>{wishlistSelected?.name}</h1>
            <hr/>
            <table className="table table-striped table-bordered">
                <thead className="table-header">
                <tr>
                    <th>Symbol</th>
                    <th>Quote</th>
                    <th>EPS</th>
                    <th>BookValue</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {wishlistSelected?.stocks?.map(stock=> (
                    <tr key={stock.id}>
                        <td>{stock.Symbol}</td>
                        <td>{stock.price}</td>
                        <td>{stock.EPS}</td>
                        <td>{stock.BookValue}</td>
                        <td>
                            <button className="btn btn-danger" onClick={()=>handleDelete(stock.id)}>Delete</button>
                        </td>
                    </tr>

                ))}

                </tbody>
            </table>
        </div>
    );
}

export default WishlistSummary;