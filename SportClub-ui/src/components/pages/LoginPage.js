import React from "react";


const LoginPage = () => (
    <div>
        <h1>Logowanie</h1>

        <div className="LoginForm">

            <label htmlFor="userName">Username</label>
            <br/>
            <input type="text" placeholder="Enter Username" name="uname" required/>
            <br/>
            <label htmlFor="password">Password</label>
            <br/>
            <input type="password" placeholder="Enter Password" name="psw" required/>
            <br/>
            <button type="submit">Login</button>

        </div>

    </div>
);

export default LoginPage;