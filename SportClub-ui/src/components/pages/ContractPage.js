import React, {Component} from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import axios from "axios";
import {ListGroup} from "react-bootstrap";
import Moment from 'moment';
const url = "http://localhost:8080/mycontract";

export default class ContractPage extends Component{

    constructor(props) {
        super(props);
        this.state={
            start_date: new Date(),
            end_date:new Date(),
            money: 0,
        }
        this.stateChange=this.stateChange.bind(this);
    }
    async componentWillMount() {
        await axios.get(url)
            .then(response => {
                this.setState({money: response.data.money, start_date: response.data.start_date, end_date: response.data.end_date});
                console.log(this.state);
            }).catch(error => {
                console.log(error);
            })

    }
    stateChange()
    {
        this.componentWillMount();
    }
    render() {
        const {start_date, end_date, money} = this.state;
        return(
            <div>
                <Menu />
                    <div className="row mt-4">
                            <h1>Your contract</h1>
                    </div>
                    <div className="row mt-4">
                    <ListGroup>
                        <ListGroup.Item  variant="info" >Contract start: {Moment(this.state.start_date).format('d MMM y')}</ListGroup.Item>
                        <ListGroup.Item  variant="info">Contract end: {Moment(this.state.end_date).format('d MMM y')}</ListGroup.Item>
                        <ListGroup.Item variant="info">Weekly wage: {this.state.money}</ListGroup.Item>
                    </ListGroup>
                    </div>
                <Footer />
            </div>
        )

    }
}