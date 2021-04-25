import React, {Component} from "react";
import {Form,Button, Col} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
export default class ChangeRole extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.id = this.props.match.params.id;
        this.dataChange = this.dataChange.bind(this);
        this.changeRole = this.changeRole.bind(this);

    }
    initialState = {
        firstName:'',lastName:'',email:'',role:'COACH', id:'' //role must be set by default
    }


    changeRole = async(event) => {
        const update = {
            appUserRole: this.state.role
        }
        event.preventDefault();
        try {
            const url = "http://localhost:8080/appUsers/" + this.state.id;
            const response = await axios.patch(url, update );
            console.log('👉 Returned data:', response);
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }
    dataChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        const {email,firstName,lastName,appUserRole, id} = this.state;
        let errorek=false;
        let content;

        axios.get("http://localhost:8080/appUsers/"+this.state.id).then(response=>{
            console.log(response)
        }).catch(function (error){
           errorek=true;
           console.log(errorek);
        });

        if(!errorek)
        {
            content=<div id="logform">
                <div id="mainInscript">
                    <h1 data-testid="required-h1">Change role</h1>
                </div>

                <Form onSubmit={e => this.changeRole(e)} id="changeRoleForm">

                    <Form.Group as={Col} controlId="formRole">
                        <div className="row">
                            <Form.Label>Role</Form.Label>
                        </div>
                        <Form.Control required autoComplete="off" as="select" name="role" onChange={this.dataChange}>
                            <option value="COACH">Coach</option>
                            <option value="PLAYER">Player</option>
                            <option value="ADMIN">Admin</option>
                        </Form.Control>

                    </Form.Group>

                    <div id="button" className="row">
                        <button>Submit</button>
                    </div>

                </Form>
            </div>;
        } else { content = <div>Error</div>;}
       return(
           <div>{content}</div>
       );

    }
};
