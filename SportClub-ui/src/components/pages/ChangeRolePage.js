import React, {Component} from "react";
import {Form, Col} from 'react-bootstrap';
import axios from 'axios';

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import NotFound from "./NotFound";

export default class ChangeRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName:'',lastName:'',email:'',role:'COACH', id:'',err:true, status: 0 //role must be set by default
        }
        this.state.id = this.props.match.params.id;
        this.dataChange = this.dataChange.bind(this);
        this.changeRole = this.changeRole.bind(this);
    }

    componentWillMount() {
        axios.get("http://localhost:8080/appUsers/"+this.state.id).then(response=>{
            console.log(response)
            this.setState({err:false});
        }).catch(error =>{
            this.setState({status:error.request.status})
        });
    }


    changeRole = async(event) => {
        const update = {
            appUserRole: this.state.role
        }
        event.preventDefault();
        try {
            const url = "http://localhost:8080/appUsers/" + this.state.id;
            const response = await axios.patch(url, update );
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
        const {email,firstName,lastName,appUserRole, id,err,status} = this.state;
        if( status === 403 )
            return <NotFound/>;
        let content;

        if(!this.state.err)
        {
            content=<div id="logform">
                <Menu />
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
                <Footer />
            </div>;
        } else { content = <div></div>;}
       return(
           <div>{content}</div>
       );

    }
};
