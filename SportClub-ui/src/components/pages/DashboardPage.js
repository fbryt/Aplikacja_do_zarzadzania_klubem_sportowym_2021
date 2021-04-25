import React, {Component} from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";

export default class DashboardPage extends Component{

    constructor(para) {
        super(para);
    }

    render() {
        return(
            <div>
               <Menu />
               <Footer />
            </div>
        )

    }
}