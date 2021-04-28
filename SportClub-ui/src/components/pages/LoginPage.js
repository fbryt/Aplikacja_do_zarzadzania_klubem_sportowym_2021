import React, {Component} from "react";
import {Form, Col,  Button} from "react-bootstrap"
import axios from 'axios';

import AuthService from '../../services/AuthService';
import Footer from "../menu/Footer";
import {BrowserRouter, Link} from "react-router-dom";


export default class LoginPage extends Component{


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }

    initialState = {
        username:'',
        password:'',
        err:false
    }

    submitLogin = event =>{

        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
        }

        axios.post("http://localhost:8080/authenticate",user)
             .then((response) => {
                 AuthService.registerSuccessfulLoginForJwt(this.state.username, response.data.jwt);
                 this.props.history.push(`/dashboard`)
             }).catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response) }
            this.setState({err:true});
             });

    }
    dataChange = event =>
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }



    render() {
        const {username,password,err} = this.state;
        let message;
        if(this.state.err)
        { message=<h6 style={{color:"red"}} >Invalid Username or Password!</h6>}
        return (
            <div  id="logform">
                <div id="mainInscript">
                    <h1>Login Page</h1>
                </div>


                <Form onSubmit={this.submitLogin} id="LoginForm">

                        <Form.Group as={Col} controlId="formUsername">
                            <div className="row">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required autoComplete="off" type="username" name="username"  onChange={this.dataChange} />
                            </div>

                        </Form.Group>
                        <Form.Group as={Col} controlId="formPassword">
                            <div className="row">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required autoComplete="off" type="password" name="password" onChange={this.dataChange} />
                            </div>
                            <div>
                                {message}
                            </div>

                        </Form.Group>


                        <div id="button" className="row">
                            <button>Log in</button>
                        </div>

                </Form>

                <div id="button" className="row">
                   <BrowserRouter>
                    <Link  to="/forgotpassword">
                    <button>Forget password</button>
                    </Link>
                   </BrowserRouter>
                </div>

                <Footer />
            </div>
        );
    }

}



