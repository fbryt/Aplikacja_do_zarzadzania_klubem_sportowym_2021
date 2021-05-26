import React, {Component} from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";


export default class EventPage extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                <Menu/>
                <div className="row mt-4">
                </div>
                <Footer/>
            </div>
        )

    }
}