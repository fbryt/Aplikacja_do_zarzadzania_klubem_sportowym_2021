import React, {Component} from "react";
import {Form, Col,  Button} from "react-bootstrap"
import axios from 'axios';

import AuthService from '../../services/AuthService';
import Footer from "../menu/Footer";
import {BrowserRouter, Link, Router} from "react-router-dom";


export default class CoachPlayerPage extends Component{


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }

    initialState = {
        id:'',
       coach:''
    }

    submitLogin = event =>{

        event.preventDefault();
        const update = {

            coach: this.state.coach,
        }

        try {
            const url = "http://localhost:8080/appUsers/" + this.state.id;
             axios.patch(url, update);
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }

    }
    dataChange = event =>
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }



    render() {
        const {id, coach} = this.state;

        return (
            <div  id="logform">
                <div id="mainInscript">
                    <h1>Connect player with coach</h1>
                </div>


                <Form onSubmit={this.submitLogin} id="LoginForm">

                    <Form.Group as={Col} controlId="formUsername">
                        <div className="row">
                            <Form.Label>Player id</Form.Label>
                            <Form.Control required autoComplete="off" type="id" name="id"  onChange={this.dataChange} />
                        </div>

                    </Form.Group>
                    <Form.Group as={Col} controlId="formPassword">
                        <div className="row">
                            <Form.Label>Coach id</Form.Label>
                            <Form.Control required autoComplete="off" type="coach" name="coach" onChange={this.dataChange} />
                        </div>


                    </Form.Group>


                    <div id="button" className="row">
                        <button>Log in</button>
                    </div>

                </Form>


                <Footer />
            </div>
        );
    }

}
