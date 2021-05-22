import React, {Component} from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import axios from "axios";


export default class CoachPanel extends Component {

    constructor(props) {
        super(props);

    }
    async componentWillMount() {
        await axios.get("http://localhost:8080/appUsers/players")
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })

    }

    stateChange() {
        this.componentWillMount();
    }


    render() {
        return (
            <div>
                <Menu/>
                <h1>Coach Panel</h1>


                <Footer/>
            </div>
        )

    }
}