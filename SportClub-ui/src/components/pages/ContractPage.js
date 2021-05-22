import React, {Component} from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import axios from "axios";
import {ListGroup} from "react-bootstrap";
import Moment from 'moment';

const url = "http://localhost:8080/mycontract";

export default class ContractPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start_date: new Date(),
            end_date: new Date(),
            money: 0,
        }
        this.stateChange = this.stateChange.bind(this);
    }

    async componentWillMount() {
        await axios.get(url)
            .then(response => {
                this.setState({
                    money: response.data.money,
                    start_date: response.data.start_date,
                    end_date: response.data.end_date
                });
                console.log(this.state);
            }).catch(error => {
                console.log(error);
            })

    }

    stateChange() {
        this.componentWillMount();
    }

    render() {
        const {start_date, end_date, money} = this.state;
        return (
            <div>
                <Menu/>
                <div className="row mt-4">
                </div>
                <div className="row mt-4">
                    <div className="col-sm">
                    </div>
                    <div className="col-sm mt-6 bg-light">
                        <h1>Your contract</h1>
                        <div className="form-group row">
                            <label htmlFor="start" className="col-sm-2 col-form-label">Start date:</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="start"
                                       value={Moment(this.state.start_date).format('d MMM y')}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="end" className="col-sm-2 col-form-label">End date:</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="end"
                                       value={Moment(this.state.end_date).format('d MMM y')}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="money" className="col-sm-2 col-form-label">Wage</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="money"
                                       value={this.state.money}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                    </div>
                </div>
                <Footer/>
            </div>
        )

    }
}