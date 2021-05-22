import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import style from '../../cssFiles/mystyle.module.css';
import Footer from "../menu/Footer";


const HomePage = () => (
    <div>
        <div className="row bg-light">
            <div className="col-sm">
            </div>
            <div className="col-sm">
                <h1 className="">Sport club app</h1>
            </div>
            <div className="col-sm">
            </div>
        </div>
        <div className="row bg-light mt-8 pb-4">
            <div className="col-sm">
            </div>
            <div id="buttonHome" className="col-sm">
                    <Link  to="/login">
                    <button className="btn btn-dark btn-lg btn-block">Login form</button>
                    </Link>
            </div>
            <div className="col-sm">
            </div>
        </div>
            <Footer />
    </div>
);

export default HomePage;