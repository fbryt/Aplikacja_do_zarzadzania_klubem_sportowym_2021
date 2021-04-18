import React, {Component} from "react";
import MenuPlayer from '../MenuPlayer'



export default class DashboardPage extends Component{

    constructor(para) {
        super(para);
    }
    render() {
        return(
            <div>
                <MenuPlayer/>
            </div>
        )
    }
}