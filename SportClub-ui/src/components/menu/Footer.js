import React from "react";
import {
    Navbar,
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
