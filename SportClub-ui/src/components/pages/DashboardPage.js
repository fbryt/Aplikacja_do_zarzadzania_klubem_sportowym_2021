import React, {Component} from "react";
import MenuPlayer from '../MenuPlayer'
import MenuAdmin from "../MenuAdmin";
import MenuCoach from "../MenuCoach";



export default class DashboardPage extends Component{

    constructor(para) {
        super(para);
    }
    render() {
        return(
            <div>
                <MenuPlayer/>
                <MenuAdmin />
                <MenuCoach />
            </div>
        )
    }
}