import React, {useState} from 'react';

function LandingPage(props) {

    return (
        <section >
            <header className="theme text-white text-center py-5">
                <h1 className="display-4">Stock Market Analysis App</h1>
                <p className="lead">Your gateway to informed investment decisions</p>
            </header>

            <section className=" text-center hero">
                <div className="hero_overlay">
                    <p className="lead">Make data-driven investment choices with our powerful stock market analysis
                        app.</p>
                    <a href="#download" className="btn btn-primary btn-lg">Create an Account</a>
                </div>
            </section>

        </section>
    );
}

export default LandingPage;