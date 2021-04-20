import React, {Component} from "react";
import MenuPlayer from '../MenuPlayer'
import MenuAdmin from "../MenuAdmin";
import MenuCoach from "../MenuCoach";



export default class DashboardPage extends Component{

    constructor(para) {
        super(para);
    }

    render() {
    var xd=localStorage.getItem('role');
    let n;
    if(xd=='COACH')
    {
        n=<MenuCoach />;
    }else if(xd=='PLAYER')
    {
     n=<MenuPlayer />;
    } else n=<MenuAdmin />;
        return(
            <div>
               {n}
            </div>
        )
    }
}