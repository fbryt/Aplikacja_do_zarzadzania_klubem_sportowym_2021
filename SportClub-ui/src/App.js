import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage"
import DashboardPage from "./components/pages/DashboardPage";
import AuthRoute from "./components/AuthComponent";
import AuthService from './services/AuthService';
import ResetPassword from './components/pages/ResetPasswordPage';
import AppUsersPage from "./components/pages/AppUsersPage";
import ResetPasswordToken from "./components/pages/ResetPasswordTokenPage";
import CoachPlayerPage from "./components/pages/CoachPlayerPage";
import ChangePassword from "./components/pages/ChangePasswordPage";
import NotFound from "./components/pages/NotFound";
import AnnouncementPage from "./components/pages/AnnouncementPage";
import Register from "./components/Register";
import ContractPage from "./components/pages/ContractPage";


class App extends React.Component {


    render() {
        AuthService.refreshAxiosInterceptors();

        return (

            <BrowserRouter>
                <Switch>
                    <Route exact path="/" exact component={HomePage} />
                    <Route exact path="/login" exact component={LoginPage} />
                    <Route exact path="/register" exact component={Register} />
                    <Route exact path="/forgotpassword" exact component={ResetPassword} />
                    <Route exact path="/resetpassword/:token" exact component={ResetPasswordToken} ></Route>

                    <AuthRoute exact path="/settings/password" exact component={ChangePassword}/>
                    <AuthRoute exact path="/dashboard" exact component={DashboardPage} />
                    <AuthRoute exact path="/appUsers" exact component={AppUsersPage} />
                    <AuthRoute exact path="/playersWithCoach" exact component={CoachPlayerPage} />
                    <AuthRoute exact path="/announcement" exact component={AnnouncementPage} />
                    <AuthRoute exact path="/mycontract" exact component={ContractPage} />
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );

    }


};

export default App;

