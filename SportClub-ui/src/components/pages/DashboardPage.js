import React, {Component} from "react";
import Menu from "../Menu";
import Footer from "../Footer";

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