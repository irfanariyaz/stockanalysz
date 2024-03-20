import React from 'react';

function Navbar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-transparent d-flex justify-content-between">
            <a className="navbar-brand" href="#">
                <img src="/images/logo.avif" alt="App Logo" height="30"/>
            </a>

                <div className=" ">
                    <a href={`/login`} className="btn btn-outline-light mx-4">Login</a>
                    <a href={`/register`} className="btn btn-outline-light mr-2 mx-2">Register</a>
                    {/*<img src="/images/profile.jpeg" alt="Profile Picture" className="rounded-circle ml-2 border  p-1" height="40" width="40px"/>*/}
                </div>
        </nav>
    );
}

export default Navbar;