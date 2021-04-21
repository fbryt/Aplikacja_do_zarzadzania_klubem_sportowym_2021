import React, {Component} from "react";
import {Form, Col,  Button} from "react-bootstrap"
import axios from 'axios';

import AuthService from '../../services/AuthService';


export default class LoginPage extends Component{


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }

    initialState = {
        username:'',
        password:''
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
             }).catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response) } });

    }
    dataChange = event =>
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }


    render() {
        const {username,password} = this.state;
        return (
            <div>
                <h1>Login Page</h1>

                <Form onSubmit={this.submitLogin} id="LoginForm">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formUsername">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required autoComplete="off" type="username" name="username"  onChange={this.dataChange} />
                            <Form.Text className="text-muted">

                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required autoComplete="off" type="password" name="password" onChange={this.dataChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button variant="success" type="submit">
                            Sign in
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }

}



