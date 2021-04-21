import React, {Component} from "react";
import Menu from "../Menu";


export default class DashboardPage extends Component{

    constructor(para) {
        super(para);
    }

    render() {
        return(
            <div>
               <Menu />
            </div>
        )

    }
}