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
                        <table className="listItemTable">
                            <tr>
                                <th className="listItem">First Name</th>
                                <td className="listItemText"><strong>{this.state.data.firstName}</strong></td>
                            </tr>
                            <tr>
                                <th className="listItem">Last Name</th>
                                <td className="listItemText"><strong>{this.state.data.lastName}</strong></td>
                            </tr>
                            <tr>
                                <th className="listItem">Email</th>
                                <td className="listItemText"><strong>{this.state.data.email}</strong></td>
                            </tr>
                            <tr>
                                <th className="listItem">Role</th>
                                <td className="listItemText"><strong>{this.state.data.appUserRole}</strong></td>
                            </tr>
                        </table>
                    </Container>
                </div>

                <Footer></Footer>
            </div>
        )
    }

}