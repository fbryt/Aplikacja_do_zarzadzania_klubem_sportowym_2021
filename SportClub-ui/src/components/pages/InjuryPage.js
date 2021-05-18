import React, {Component} from "react";
import axios from "axios";
import Menu from "../menu/Menu";
import {Form, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import EdiText from "react-editext";
import Footer from "../menu/Footer";

export default class InjuryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dateFrom: new Date(),
            dateTo: new Date(),
        };
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
        this.OnSave = this.OnSave.bind(this);
        this.submitInjury = this.submitInjury.bind(this);
    }

    submitInjury = event => {

        event.preventDefault();
        const injury = {
            start_date: this.state.dateFrom,
            end_date: this.state.dateTo,
            description:this.state.text,
        }

        const url = "http://localhost:8080/injuries"
        axios.post(url, injury);    //TODO: fix
        this.props.history.push(`/dashboard`);
    }

    handleChangeFrom(date) {
        this.setState({
            dateFrom: date
        })
    }
    handleChangeTo(date) {
        this.setState({
            dateTo: date
        })
    }

    OnSave = text => {
        this.setState({
            text: text
        })
    }

    render() {
        const { text, dateFrom,dateTo } = this.state;
        return (
            <div id="logform">
                <Menu />
                <div id="mainInscript">
                    <h1>Claim injured</h1>
                </div>
                <Form onSubmit={this.submitInjury} id="LoginForm">

                    <div id="mainInscript" >
                        <FormLabel>From:  </FormLabel>
                        <DatePicker
                            className="calendar"
                            selected={this.state.dateFrom}
                            onChange={this.handleChangeFrom}
                            showTimeInput
                        />

                    </div>
                    <div id="mainInscript" >
                        <FormLabel>To:  </FormLabel>
                        <DatePicker
                            className="calendar"
                            selected={this.state.dateTo}
                            onChange={this.handleChangeTo}
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
                    </div>

                    <div id="button" className="row">
                        <button>Submit</button>
                    </div>
                </Form>
                <Footer/>
            </div>

        );
    }
}