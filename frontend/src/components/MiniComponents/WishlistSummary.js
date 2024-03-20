import React from 'react';

function WishlistSummary(props) {
    const {wishlistSelected} = props;
    const handleDelete = ()=>{

    }
    return (
        <div>
            <h1>{wishlistSelected.name}</h1>
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
                {wishlistSelected.stocks?.map(stock=> (
                    <tr key={stock.id}>
                        <td>{stock.Symbol}</td>
                        <td>{stock.price}</td>
                        <td>{stock.EPS}</td>
                        <td>{stock.BookValue}</td>
                        <td>
                            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </td>
                    </tr>

                ))}

                </tbody>
            </table>
        </div>
    );
}

export default WishlistSummary;