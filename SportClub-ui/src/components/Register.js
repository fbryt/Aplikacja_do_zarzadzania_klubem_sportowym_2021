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
            fistName:'',lastName:'',email:'',password:'',role:''
        }
    submitRegister = event =>
    {
        alert(this.state.name);
        event.preventDefault();
        const user = {
            fistName: this.state.name,
            lastName: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }
        axios.post("localhost:8080/register",user)
            .then(response => {
                if(response.data !=null)
                {
                    this.setState(this.initialState);
                    alert("Successful");
                }
            });
    }
    dataChange = event =>
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        const {email,password,name,surname,role} = this.state;
        return (
            <div>
                <h1>Register</h1>
                <Form onSubmit={this.submitRegister} id="registerForm">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required autoComplete="off" type="email"  onChange={this.dataChange} placeholder="Enter email"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required autoComplete="off" type="password" onChange={this.dataChange} placeholder="Password"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required autoComplete="off" type="text" onChange={this.dataChange} placeholder="Enter name"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control required autoComplete="off" type="text"  onChange={this.dataChange} placeholder="Enter surname"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control required autoComplete="off" as="select" onChange={this.dataChange} defaultValue="Choose...">
                                <option>Coach</option>
                                <option>Player</option>
                                <option>Admin</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button as={Col} variant="success" type="submit">
                            Submit
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }
};
