import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import style from '../../cssFiles/mystyle.module.css';


const HomePage = () => (
    <div>
        <h1>Home page</h1>
        <Link className={style.blueButton} to="/login">
            <Button>
                Login
            </Button>
        </Link>
    </div>
);

export default HomePage;