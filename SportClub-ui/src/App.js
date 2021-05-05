import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage"
import Register from "./components/Register"
import DashboardPage from "./components/pages/DashboardPage";
import ChangeRole from "./components/pages/ChangeRolePage";
import AuthRoute from "./components/AuthComponent";
import AuthService from './services/AuthService';
import ResetPassword from './components/pages/ResetPasswordPage';
import ChangePassword from './components/pages/ChangePasswordPage';

class App extends React.Component {


    render(){
        AuthService.refreshAxiosInterceptors();

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" exact component={HomePage}/>
                    <Route exact path="/login" exact component={LoginPage}/>
                    <Route exact path="/register" exact component={Register}/>
                    <Route exact path="/forgotpassword" exact component={ResetPassword}/>
                    <Route exact path="/settings/password" exact component={ChangePassword}/>

                    <AuthRoute exact path="/dashboard" exact component={DashboardPage}/>
                    <AuthRoute exact path="/appUsers/:id" render={(props) => <ChangeRole {...props} />} />
                </Switch>
            </BrowserRouter>

        );

    }


};

export default App;

