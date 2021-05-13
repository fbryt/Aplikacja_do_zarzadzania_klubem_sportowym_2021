import React, {useState} from "react";
import { Button,Modal,Form} from "react-bootstrap"
import axios from "axios";
export const AnnCard =({announcement})=>{

    const [show,setShow]=useState(false);

    const handleClose=()=>setShow(false);
    const handleShow=()=>setShow(true);
    let update={
        text:announcement.text,
    };

    function edit(){
        try {
            const url = "http://localhost:8080/announcements/" + announcement.id;
            const response = axios.patch(url, update );
            console.log('👉 Returned data:', response);
            handleClose();

        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }

    }
    function remove(){
        console.log("Remove")
    }
    function dataChange(t)
    {
        update.text=t.target.value;
    }


    return (
        <div id="logform">
            <div class="row">
                <div><h5>{announcement.user.firstName} {announcement.user.lastName}</h5></div>
                <div class="date">{announcement.date.substring(0,10)+" "+announcement.date.substring( 11,16)}</div>
            </div>
            <div>
            <span class="text">{announcement.text}</span>
            </div>
        <Button variant="primary" size="sm" onClick={handleShow}>
            Edit
        </Button>{" "}
            <Button variant="primary" size="sm" onClick={remove}>
                Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={edit}>
                        <Form.Group controlId="modalEdit">
                            <Form.Label>Edit text</Form.Label>
                            <Form.Control as="textarea" rows={3} readOnly={false} defaultValue={announcement.text} onChange={dataChange}/>
                        </Form.Group>
                        <Button onClick={edit}>Save Changes</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>

    );

};
export default AnnCard;