import React, {Component} from "react";
import {Form, Button, Col, ListGroup, ListGroupItem, Container,Row} from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";



const url = "http://localhost:8080/settings/";


export default class SettingsPage extends Component{

    constructor(para) {
        super(para);
        this.state = {
            data:[]
        }
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
                        <ListGroup horizontal>
                            <Row>
                                <Col>

                                    <ListGroupItem className="listItem">First Name</ListGroupItem>
                                    <ListGroupItem className="listItem">Last Name</ListGroupItem>
                                    <ListGroupItem className="listItem">Email</ListGroupItem>
                                    <ListGroupItem className="listItem">Role</ListGroupItem>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ListGroupItem className="listItemText"><strong>{this.state.data.firstName}</strong></ListGroupItem>
                                    <ListGroupItem className="listItemText"><strong>{this.state.data.lastName}</strong></ListGroupItem>
                                    <ListGroupItem className="listItemText"><strong>{this.state.data.email}</strong></ListGroupItem>
                                    <ListGroupItem className="listItemText"><strong>{this.state.data.appUserRole}</strong></ListGroupItem>
                                </Col>
                            </Row>
                        </ListGroup>
                    </Container>
                </div>

                <Footer></Footer>
            </div>
        )
    }

}
