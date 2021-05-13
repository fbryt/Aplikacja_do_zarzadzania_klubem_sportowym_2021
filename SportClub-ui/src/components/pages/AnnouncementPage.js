import React, {Component} from "react";


import Footer from "../menu/Footer";
import axios from "axios";
import {Col, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import EdiText from 'react-editext'
import AuthService from '../../services/AuthService';
import "react-datepicker/dist/react-datepicker.css";


export default class AnnouncementPagePage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            date: new Date(),
            userId : AuthService.getLoggedInId()

        };
        this.handleChange = this.handleChange.bind(this);
        this.OnSave = this.OnSave.bind(this);
        this.submitText = this.submitText.bind(this);

    }

    submitText = event =>{

        event.preventDefault();
        const announ = {
            text: this.state.text,
            date: this.state.date,
            userId: this.state.userId
        }

        try {
            const url = "http://localhost:8080/announcements"
            axios.post(url, announ);
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }


    }

    handleChange(date) {
        this.setState({
            date: date
        })
    }

    OnSave = text => {
        this.setState({
            text: text
        })
    }




    render() {
        const {text, date} = this.state;


        return (
            <div  id="logform">
                <div id="mainInscript">
                    <h1>Create Announcement</h1>
                </div>

                <Form onSubmit={this. submitText} id="LoginForm">

                    <div id="mainInscript">
                        <DatePicker

                            selected={this.state.date}
                            onChange={this.handleChange}
                            showTimeInput

                        />

                    </div>

                    <div id="mainInscript">
                    <EdiText
                        viewContainerClassName='my-custom-view-wrapper'
                        type='textarea'
                        inputProps={{
                            className: 'textarea',
                            placeholder: 'Type your content here',
                            style: {
                                outline: 'none',
                                minWidth: 'auto'
                            },
                            rows: 5
                        }}
                        value="Type your content here"
                        onSave={this.OnSave}
                    />
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