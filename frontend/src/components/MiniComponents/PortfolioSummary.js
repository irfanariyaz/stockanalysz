import React from 'react';

function PortfolioSummary(props) {
    const {user,portfolioSelected} = props;
    const handleDelete = ()=>{

    }
    return (
        <div>
            <h1>{portfolioSelected?.name}</h1>
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
                {portfolioSelected.stocks?.map(stock=> (
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

export default PortfolioSummary;