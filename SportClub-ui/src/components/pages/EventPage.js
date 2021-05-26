import React, {Component} from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import {Form} from "react-bootstrap";
import EdiText from "react-editext";
import TimePicker from 'react-time-picker';
import axios from "axios";
import DatePicker from "react-datepicker";
import AuthService from "../../services/AuthService";


export default class EventPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            date_start: new Date(),
            date_end : new Date()
        };

        this.OnSave = this.OnSave.bind(this);
        this.submitText = this.submitText.bind(this);
        this.changeDate1 = this.changeDate1.bind(this);
        this.changeDate2 = this.changeDate2.bind(this);
    }


    submitText = event => {

        event.preventDefault();
        const ev = {
            message: this.state.text,
            dateStart: this.state.date_start,
            dateEnd: this.state.date_end
        }

        //const url = "http://localhost:8080/announcements"
        //axios.post(url, ev)
        //    .then((response) => {
        //    this.props.history.push(`/dashboard`)
        //}).catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response) }
        //});

    }


    OnSave = text => {
        this.setState({
            text: text
        })
    }

    changeDate1 = date =>{
        this.setState({
            date_start: date
        })
    }

    changeDate2 = date =>{
        this.setState({
            date_end: date
        })
    }


    render() {
        return (
            <div id="logform">
                <Menu/>
                <div id="mainInscript">
                    <h1>Create event</h1>
                </div>
                <Form onSubmit={this.submitText} id="LoginForm">

                    <div id="mainInscript" >
                        <h5>Start date</h5>
                        <DatePicker
                            className="calendar"
                            selected={this.state.date_start}
                            onChange={this.changeDate1}
                            showTimeInput

                        />

                    </div>

                    <div id="mainInscript" >
                        <h5>End date</h5>
                        <DatePicker
                            className="calendar"
                            selected={this.state.date_end}
                            onChange={this.changeDate2}
                            showTimeInput

                        />

                    </div>


                    <div id="mainInscript" >
                        <EdiText
                            viewContainerClassName='textPlaceholder'
                            type='textarea'
                            inputProps={{
                                className: 'textarea',
                                placeholder: 'Event description',
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
                                placeholder: 'Event description',
                                style: {
                                    outline: 'none',
                                    minWidth: 'auto',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: 5,
                                    height: '150px',
                                },

                            }}
                            value="Event description"
                            onSave={this.OnSave}
                        />
                    </div>

                    <div id="button" className="row">
                        <button className="btn btn-dark btn-lg btn-block">Submit</button>
                    </div>


                </Form>
                <Footer/>
            </div>
        )

    }
}