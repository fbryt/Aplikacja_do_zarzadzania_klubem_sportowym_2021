import React, {Component} from "react";
import {Form, Button, Col, ListGroup, ListGroupItem, Container,Row} from 'react-bootstrap';
import axios from 'axios';

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";



const url = "http://localhost:8080/settings/";


export default class SettingsPage extends Component{

    constructor(para) {
        super(para);
        this.state = {
            data:[]
        }
        this.state.data.firstName='';
        this.state.data.lastName='';
        this.state.data.email='';
        this.state.data.appUserRole='';
    }

    async componentWillMount(){

        await axios.get(url).then(response =>{
            this.setState({data: response.data});
        }).catch(error =>{
            console.log(error);
        })
    }


    render() {
        return (
            <div>
                <Menu></Menu>
                <div id="settingsPage">
                    <Container>
                        <div id="mainInscript">
                            <h1>User Info</h1>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">First Name</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="name"
                                       value={this.state.data.firstName}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="surname" className="col-sm-2 col-form-label">Surname</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="surname"
                                       placeholder="surname" value={this.state.data.lastName}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="email"
                                       placeholder="email" value={this.state.data.email}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="role" className="col-sm-2 col-form-label">Role</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="role"
                                       placeholder="role" value={this.state.data.appUserRole}/>
                            </div>
                        </div>
                    </Container>
                </div>
                <Footer></Footer>
            </div>
        )
    }

}