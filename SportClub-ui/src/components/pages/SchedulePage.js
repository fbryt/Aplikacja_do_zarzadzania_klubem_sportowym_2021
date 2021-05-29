import React, {Component} from "react";
import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from "axios";
const url = "http://localhost:8080/event";

export default class SchedulePage extends Component{

    constructor(para) {
        super(para);
        this.state={
            data:[]
        }

    }
    async componentWillMount() {
        await axios.get(url)
            .then(response => {
                const data = response.data;
                this.setState({data: data});
            }).catch(error => {
                console.log(error);
            })
    }
    render() {
        return(
            <div>
                <Menu />
                <div className="row mt-4"></div>
                <div className="row mt-4">
                    <div className="col-2"> </div>
                    <div className="col-sm bg-light border border-dark">
                        <FullCalendar
                            plugins={[ dayGridPlugin,timeGridPlugin, interactionPlugin ]}
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            themeSystem="bootstrap"
                            events={this.state.data}
                        />
                    </div>
                    <div className="col-2"> </div>
                </div>
                <Footer />
            </div>
        )

    }
}