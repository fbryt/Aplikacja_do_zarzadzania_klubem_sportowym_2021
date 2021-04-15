import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage"
import Register from "./components/Register"
import DashboardPage from "./components/pages/DashboardPage";
import ChangeRole from "./components/pages/ChangeRolePage";
import AuthRoute from "./components/AuthComponent";





class App extends React.Component {

    render(){
        return (

            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/register" exact component={Register}/>

                    <AuthRoute path="/dashboard" exact component={DashboardPage}/>
                    <AuthRoute path="/appUsers/:id" render={(props) => <ChangeRole {...props} />} />
                </Switch>
            </BrowserRouter>
        );

    }


};

export default App;

