import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Dropdown,
    DropdownButton,
} from "react-bootstrap";
const Footer = () => {
    return (
        <div className="footer">
            <Navbar bg="dark" variant="dark">
                <div className="text-center p-3 text-light">
                    © 2021 Copyright:
                    <a href="#"> B&B Sport</a>
                </div>
            </Navbar>
        </div>
    );
};
export default Footer;
