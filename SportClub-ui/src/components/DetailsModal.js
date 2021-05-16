import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap"
import axios from "axios";

const url = "http://localhost:8080/contract/user/";

export const DetailsModal = ({ appUser }) => {



    const [show, setShow] = useState(false);
    const [contractData, setContractData] = useState([]);

    useEffect(async () => {
        if (appUser === undefined) return;

        await axios.get(url + appUser.id).then(response => {
            setContractData(response.data);
        }).catch(error => {
            setContractData(null);
            //console.log(error);
        });

    }, []);

    if (appUser === undefined) return null;

    console.log(contractData);

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const handleChange = () => {

    }
    const handleSave = () => {

    }
    const handleNew = () => {

    }

    const contractGroup = (contractData) ?
        <Form.Control as="textarea" rows={3} readOnly={false} defaultValue={appUser.firstName + " " + appUser.lastName}
            onChange={handleChange} /> :
        <div>
            <h1>This user has no contract.</h1>
            < Button variant="primary" size="sm" onClick={handleNew} >
                Create New Contract
            </Button >
        </div>;

    return (
        <div>
            < Button variant="primary" size="sm" onClick={handleShow} >
                Details
            </Button >

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="testEdit">
                            <Form.Label>Contract Info</Form.Label>
                            {contractGroup}

                        </Form.Group>
                        {contractData ?
                            <Button onClick={handleSave}>Save Changes</Button>
                            : ""}
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}