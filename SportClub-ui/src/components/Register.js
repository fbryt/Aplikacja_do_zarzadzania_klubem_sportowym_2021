import React, {Component} from "react";
import {Form,Button, Col} from 'react-bootstrap';
import axios from 'axios';
import NotFound from "./pages/NotFound";
import Menu from "./menu/Menu";
import Footer from "./menu/Footer";
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);

    }
    initialState = {
            firstName:'',lastName:'',email:'',password:'',role:'COACH',err:true,status: 0 //role MUST be the first option from a drop-down menu
        }

    componentWillMount() {
        axios.get("http://localhost:8080/register").then(response=>{
            console.log(response)
            this.setState({err:false});
        }).catch(error =>{
            this.setState({status:error.request.status})
        });
    }
    submitRegister = event => {
        event.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }
        
        axios.post("http://localhost:8080/register",user)
            .then(response => {
                if(response.data !=null)
                {
                    this.setState(this.initialState);
                    this.props.history.push(`/dashboard`)
                }
            })
            .catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response) } });
    }
    dataChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        const {email,password,firstName,lastName,role,err,status} = this.state;
        let content;

        if( status === 403){
            return <NotFound/>;
        }

        if(!this.state.err)
        {
            content=
                <div id="logform">
                <Menu/>
                <div id="mainInscript">
                    <h1>Register</h1>
                </div>
                <Form onSubmit={this.submitRegister} id="registerForm">
                    <Form.Group as={Col} controlId="formEmail">
                        <div className="row">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required autoComplete="off" type="email" name="email"  onChange={this.dataChange} />
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPassword">
                        <div className="row">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required autoComplete="off" type="password" name="password" onChange={this.dataChange} />
                        </div>

                    </Form.Group>
                    <Form.Group as={Col} controlId="formName">
                        <div className="row">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required autoComplete="off" type="text" name="firstName" onChange={this.dataChange} />
                        </div>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formSurname">
                        <div className="row">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control required autoComplete="off" type="text" name="lastName"  onChange={this.dataChange} />
                        </div>
                    </Form.Group>
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
                        <div className="col-sm">
                        </div>
                        <div className="col-sm">
                            <button className="btn btn-dark btn-lg">Submit</button>
                        </div>
                        <div className="col-sm">
                        </div>
                    </div>
                </Form>
            <Footer/></div>
        } else{ content=<div></div>;}
        return (
           <div>{content}</div>
        );
    }
};
