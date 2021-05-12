import axios from "axios";
import {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";
import AnnCard from "./AnnCard"
import React from "react";
const url = "http://localhost:8080/announcements/";

export default class Announcements extends React.Component {

    state={
        announcements:[]
    }
    componentDidMount() {
        axios.get(url)
            .then(response=> {
                const announcements=response.data._embedded.announcementList;
                this.setState({announcements});
                console.log(this.state.announcements);
            }).catch(error=> {
                console.log(error);
        })
    }

    render(){
        return(
            <ul>
                {
                    this.state.announcements.map(ann=><AnnCard announcement={ann} />)

                }

            </ul>
        )
    }

}
