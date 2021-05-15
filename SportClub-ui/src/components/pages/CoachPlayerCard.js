import React from "react";
import { Button,Modal,Form} from "react-bootstrap"
import axios from "axios";
import Select from "react-select";

export default class CoachPlayerCard extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            firstName:this.props.player.firstName,
            lastName:this.props.player.lastName,
             coach: '',
             option: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    submitData = event =>{

        event.preventDefault();

        const update = {
            coach: this.state.coach.toString(),
        }


        const url = "http://localhost:8080/appUsers/" + this.props.player.id;
        axios.patch(url, update).then((response) => {

            }).catch (e => {
            console.log(`😱 Axios request failed: ${e}`);
        });


    }

    renderList() {
        return (this.props.coaches.map(data =>({label:data.firstName+" "+data.lastName,value:data.id})))
    }


    handleChange(selectedOption) {
        this.setState({coach : selectedOption.value});
        this.setState({option : selectedOption});
    }

    render() {

        return (
            <div id="logform">
                <div className="row">
                    <div><h5>{this.state.firstName} {this.state.lastName}</h5></div>

                    <div style={{width: '300px'}}>
                        <Select
                            value={this.state.option}
                            onChange={this.handleChange}
                            options={this.renderList()}
                        />
                    </div>
                </div>

                <Button onClick={this.submitData}>Submit</Button>


            </div>

        );
    }
}