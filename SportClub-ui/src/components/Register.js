import React, {Component} from "react";
import {Form,Button, Col} from 'react-bootstrap';
import axios from 'axios';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);

    }
    initialState = {
            firstName:'',lastName:'',email:'',password:'',role:''
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
        alert(user.firstName);
        console.log(user);
        axios.post("http://localhost:8080/register",user)
            .then(response => {
                if(response.data !=null)
                {
                    this.setState(this.initialState);
                    alert("Successful");
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
        const {email,password,firstName,lastName,role} = this.state;
        return (
            <div>
                <h1>Register</h1>
                <Form onSubmit={this.submitRegister} id="registerForm">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required autoComplete="off" type="email" name="email"  onChange={this.dataChange} placeholder="Enter email"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required autoComplete="off" type="password" name="password" onChange={this.dataChange} placeholder="Password"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required autoComplete="off" type="text" name="firstName" onChange={this.dataChange} placeholder="Enter name"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control required autoComplete="off" type="text" name="lastName"  onChange={this.dataChange} placeholder="Enter surname"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control required autoComplete="off" as="select" name="role" onChange={this.dataChange}>
                                <option value="COACH">Coach</option>
                                <option value="PLAYER">Player</option>
                                <option value="ADMIN">Admin</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button size="sm" variant="success" type="submit">
                            Submit
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }
};
