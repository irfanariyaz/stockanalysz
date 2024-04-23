import React from 'react';
import {Link} from "react-router-dom";

function Overview({userisPresent,message}) {
    return (
        <div className="overview">
            <h4 className="text-danger">{message}</h4>
            {/*<h1 className="h1 "> A stock analysis tool designed to provide users with valuable insights and visual*/}
            {/*    representations of stock market data</h1>*/}
            <h1 className="display-4">Stock Market Analysis App</h1>
            <p className="lead">Your gateway to informed investment decisions</p>
            <div className="d-flex gap-5">
                {!userisPresent &&
                    <div className="overview_box d-flex flex-column justify-content-around
                    ">
                        <p>Make data-driven investment choices with our powerful stock market analysis
                            app</p>
                        <Link to="/register">
                            <button className="btn btn-primary b">Create an account</button>
                        </Link>
                    </div>
                }
                <div className="overview_box d-flex flex-column justify-content-around">
                    <p>Manage and track your investments </p>
                    <Link to="/portfolio">
                        <button className="btn btn-primary">Create a Portfolio</button>
                    </Link>
                </div>
                <div className="overview_box d-flex flex-column justify-content-around">
                    <p> Track and monitor stocks that you are interested in. </p>
                    <Link to="/wishlist">
                        <button className="btn btn-primary">Create a Wishlist</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Overview;