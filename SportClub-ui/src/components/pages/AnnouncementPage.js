import React, { Component } from "react";


import Footer from "../menu/Footer";
import axios from "axios";
import { Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import EdiText from 'react-editext'
import AuthService from '../../services/AuthService';
import "react-datepicker/dist/react-datepicker.css";


export default class AnnouncementPagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            date: new Date(),
            sendEmail: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.OnSave = this.OnSave.bind(this);
        this.submitText = this.submitText.bind(this);

    }

    submitText = event => {

        event.preventDefault();
        const announ = {
            text: this.state.text,
            date: this.state.date,
            sendEmail: this.state.sendEmail
        }

        const url = "http://localhost:8080/announcements"
        axios.post(url, announ);    //TODO: fix
        this.props.history.push(`/dashboard`);
    }

    handleChange(date) {
        this.setState({
            date: date
        })
    }
    handleEmail(state) {
        this.setState({
            sendEmail: state.target.checked
        })
    }
    OnSave = text => {
        this.setState({
            text: text
        })
    }


    render() {
        const { text, date } = this.state;


        return (
            <div id="logform">
                <div id="mainInscript">
                    <h1>Create Announcement</h1>
                </div>

                <Form onSubmit={this.submitText} id="LoginForm">

                    <div id="mainInscript" >
                        <DatePicker
                            className="calendar"
                            selected={this.state.date}
                            onChange={this.handleChange}
                            showTimeInput

                        />

                    </div>

                    <div id="mainInscript" >
                        <EdiText
                            viewContainerClassName='textPlaceholder'
                            type='textarea'
                            inputProps={{
                                className: 'textarea',
                                placeholder: 'Type your content here',
                                style: {
                                    outline: 'none',
                                    minWidth: 'auto',
                                    borderRadius: 5,
                                    backgroundColor: '#F5F5F5',
                                },
                                rows: 5
                            }}
                            viewProps={{
                                className: 'textarea',
                                placeholder: 'Type your content here',
                                style: {
                                    outline: 'none',
                                    minWidth: 'auto',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: 5,
                                    height: '150px',
                                },

                            }}
                            value="Type your content here"
                            onSave={this.OnSave}
                        />
                        <Form.Group controlId="emailCheckbox">
                            <Form.Check type="checkbox" onChange={this.handleEmail} label="Notify other users by e-mail" />
                        </Form.Group>
                    </div>

                    <div id="button" className="row">
                        <button>Submit</button>
                    </div>


                </Form>
                <Footer />
            </div>
        );
    }
}