import React, {useState} from 'react';

function PortfolioModal(props) {
        const [show ,setshow]=useState(false);
        const togglemodal=()=>{
                setshow(!show);
        }
    return (
        <div className="overlay" onClick={togglemodal}>
                <div className="modal-content">

                        <button className="btn btn-primary" onClick={togglemodal}>OK</button>
                        <button className="btn btn-danger"  onClick={togglemodal}>close</button>
                </div>
        </div>

    );
}

export default PortfolioModal;