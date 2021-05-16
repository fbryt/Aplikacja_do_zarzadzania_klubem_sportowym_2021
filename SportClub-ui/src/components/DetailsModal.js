import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap"
import axios from "axios";
import DatePicker from "react-date-picker";

const url = "http://localhost:8080/contract/user/";

export const DetailsModal = ({ appUser }) => {



    const [show, setShow] = useState(false);
    const [contractData, setContractData] = useState([]);

    useEffect(async () => {
        if (appUser === undefined) return;

        await axios.get(url + appUser.id).then(response => {
            setContractData({ ...response.data, start_date: new Date(response.data.start_date), end_date: new Date(response.data.end_date) });
        }).catch(error => {
            setContractData(null);
        });

    }, [show]);

    if (appUser === undefined) return null;

    console.log(contractData);

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const handleChange = (event) => {
        setContractData({
            ...contractData, [event.target.name]: event.target.value
        });
    }
    const handleSave = async () => {
        const update = {
            start_date: contractData.start_date,
            end_date: contractData.end_date,
            money: contractData.money
        }

        try {
            await axios.patch(url + appUser.id, update);
            console.log("Success!");
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }
    const handleNew = () => {
        setContractData({ money: 0, start_date: new Date(), end_date: new Date() });
    }

    const contractGroup = (contractData) ?
        <div>

            <Form.Label>Start Date</Form.Label>
            <DatePicker
                className="calendar"
                value={contractData.start_date}
                selected={contractData.start_date}
                onChange={date => setContractData({ ...contractData, start_date: date })}
                showTimeInput
            />

            <Form.Label>End Date</Form.Label>
            <DatePicker
                className="calendar"
                value={contractData.end_date}
                selected={contractData.end_date}
                onChange={date => setContractData({ ...contractData, end_date: date })}
                showTimeInput
            />
            <Form.Control required as="input" defaultValue={contractData.money}
                name="money" onChange={handleChange} />
        </div >
        :
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
                        <Form.Row>
                            <Form.Group controlId="testEdit">
                                <Form.Label>Contract Info</Form.Label>
                                {contractGroup}

                            </Form.Group>
                        </Form.Row>
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