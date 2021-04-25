import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import style from '../../cssFiles/mystyle.module.css';
import Footer from "../Footer";


const HomePage = () => (
    <div id="homeform" className="row">
        <h1>Sport club management application</h1>
        <div id="buttonHome" className="row">
                <Link  to="/login">
                <button>Login form</button>
                </Link>
        </div>
            <Footer />
    </div>
);

export default HomePage;