import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => (
    <div>
        <h1>Strona główna</h1>
        <Link to="/login">Logowanie</Link>
    </div>
);

export default HomePage;