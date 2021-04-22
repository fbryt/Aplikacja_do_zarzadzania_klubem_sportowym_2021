import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import style from '../../cssFiles/mystyle.module.css';


const HomePage = () => (
    <div id="homeform">
        <h1>Sport club management application</h1>
        <div id="button" className="row">
        <Link  to="/login">
                <button>Login</button>
        </Link>
        </div>
    </div>
);

export default HomePage;