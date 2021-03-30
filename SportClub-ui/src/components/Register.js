import React, {Component} from "react";
import {Form,Button, Col} from 'react-bootstrap';

export default class Register extends Component {

    render() {
        return (
            <div>
                <h1>Register</h1>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" placeholder="Enter surname"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Coach</option>
                                <option>Player</option>
                                <option>Admin</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button as={Col} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }
};
