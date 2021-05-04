import React, { useEffect, useState } from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import axios from "axios";
import { Col, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

const url = "http://localhost:8080/reset/";

export const ResetPasswordTokenPage = () => {

    const { token } = useParams();
    const history = useHistory();

    const [data, setData] = useState({ token: token, password: "SabalMetinczykPijanyMenel", confirm_password: "Confimed!" });
    const [error, setError] = useState([]);


    const sendRequest = async (event) => {
        event.preventDefault();

        const update = {
            token: token,
            password: data.password
        }
        try {
            //TODO: validate password
            if (data.password !== data.confirm_password) {
                setError("Passwords don't match!");
                throw new Error("Passwords don't match");
            }

            //await axios.patch(url, update);
            console.log(update);
            history.push("/login");
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const dataChange = event => {
        setData({
            ...data, [event.target.name]: event.target.value
        });
    }

    return (
        <div>
            <Container style={{ marginTop: '7em' }}>

                <div id="logform">
                    <div id="mainInscript">
                        <h1>Password reset</h1>
                    </div>
                    <Form onSubmit={sendRequest} id="LoginForm">

                        <Form.Group as={Col} controlId="password">
                            <div className="row">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required autoComplete="off" type="password" name="password" onChange={dataChange} />
                            </div>

                        </Form.Group>
                        <Form.Group as={Col} controlId="confirm_password">
                            <div className="row">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control required autoComplete="off" type="password" name="confirm_password" onChange={dataChange} />
                            </div>
                            <div>
                                <h6 style={{ color: "red" }} >{error}</h6>
                            </div>

                        </Form.Group>


                        <div id="button" className="row">
                            <button>Reset</button>
                        </div>

                    </Form>
                </div>
            </Container>
            <Footer />
        </div >
    )
}

export default ResetPasswordTokenPage;