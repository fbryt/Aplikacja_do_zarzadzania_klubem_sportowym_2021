import React, { useEffect, useState } from "react";
import { Form, Col, Container, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";

export const ChangeRole = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(async () => {
        await axios.get("http://localhost:8080/appUsers/" + id).then(response => {
            setData(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const changeRole = async (event) => {
        const update = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            appUserRole: data.appUserRole
        }
        console.log(update);
        event.preventDefault();
        try {
            const url = "http://localhost:8080/appUsers/" + id;
            await axios.patch(url, update);
            history.push(`/appUsers`)
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return <>
        <Menu />
        <Container id="logform">
            <div id="mainInscript">
                <h1 data-testid="required-h1">Change role</h1>
            </div>

            <Form className="row" onChange={e => changeHandler(e)} onSubmit={e => changeRole(e)} id="changeRoleForm">
                <Form.Group controlId="formFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="firstName" value={data.firstName} />
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="lastName" value={data.lastName} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={data.email} />
                </Form.Group>
                <Form.Group controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control required autoComplete="off" as="select" name="appUserRole" value={data.appUserRole}>
                        <option value="COACH">Coach</option>
                        <option value="PLAYER">Player</option>
                        <option value="ADMIN">Admin</option>
                    </Form.Control>
                </Form.Group>
                <button>Submit</button>
            </Form>
        </Container>
        <Footer />
    </>
};

export default ChangeRole;
