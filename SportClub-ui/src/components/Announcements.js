import axios from "axios";
import {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";
import AnnCard from "./AnnCard"
import React from "react";
import RoleService from "../services/RoleService";
const url = "http://localhost:8080/announcements/";

export default class Announcements extends React.Component {

    constructor(props) {
        super(props);

        this. state={
            announcements:[],
            role:"",
        }
        this.stateChange=this.stateChange.bind(this);
    }

    async componentWillMount() {
        let role = RoleService.getRole();
        this.setState({role: role});
        await axios.get(url)
            .then(response => {
                const ann = response.data._embedded.announcementList;
                this.setState({announcements: ann});
                console.log(ann)
            }).catch(error => {
                console.log(error);
            })

    }

    stateChange()
    {
        this.componentWillMount();
    }



    render(){
        return(
            <ul>
                {
                    this.state.announcements.map((ann)=> {return <AnnCard key={ann.id} announcement={ann} action={this.stateChange} role={this.state.role} />  })
                }
            </ul>
        )
    }

}
