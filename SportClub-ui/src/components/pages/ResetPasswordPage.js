import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import style from '../../cssFiles/mystyle.module.css';
import Footer from "../menu/Footer";
import axios from "axios";

export default class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitReset = this.submitReset.bind(this);
    }
    initialState = {
        email: ''
    }
    submitReset = event => {
        event.preventDefault();
        const user = {
            email: this.state.email,
        }
        axios.post("http://localhost:8080/forgotpassword", user)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                    this.props.history.push(`/login`)
                }
            })
            .catch(err => {
                if (err.request) {
                    console.log(err.request)
                }
                if (err.response) {
                    console.log(err.response)
                }
            });
    }
    dataChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { email } = this.state;
        return (
            <div class="row">
                <div class="col-4">

                </div>
                <div class="col-4 bg-light br-25">
                    <p class="h1" >Reset password</p>
                    <Form onSubmit={this.submitReset} id="resetForm">
                        <Form.Group as={Col} controlId="formEmail">
                            <div className="row">
                                <Form.Label class="text-dark fs-mine ">Email</Form.Label>
                                <Form.Control required autoComplete="off" type="email" name="email"
                                    onChange={this.dataChange} />
                            </div>
                        </Form.Group>
                        <div id="button" className="row">
                            <div className="col-sm">
                            </div>
                            <div className="col-sm">
                                <button className="btn btn-dark">Submit</button>
                            </div>
                            <div className="col-sm">
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="col-4">

                </div>
                <Footer />
            </div>
        );
    };
}
