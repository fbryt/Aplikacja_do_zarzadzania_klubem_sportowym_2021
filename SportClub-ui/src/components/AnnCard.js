import React from "react";
import { Button,Modal,Form} from "react-bootstrap"
import axios from "axios";
class AnnCard extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            firstName:this.props.announcement.user.firstName,
            lastName:this.props.announcement.user.lastName,
            date:this.props.announcement.date,
            text:this.props.announcement.text,
            update:
                {
                  text:this.props.announcement.text,
                },
            show:false,
            role:this.props.role,
        }
    }

    handleClose=()=>{
        this.setState({show:false})
    };
    handleShow=()=> {
        this.setState({show:true})
    };

    edit=async event => {
        event.preventDefault();
        try {

            const url = "http://localhost:8080/announcements/" + this.props.announcement.id;
            const response = await axios.patch(url, this.state.update);

        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }

        this.setState({show:false});
    }

    delete=async event => {
        try {
            const url = "http://localhost:8080/announcements/" + this.props.announcement.id + "/delete";
            const response = await axios.delete(url);
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
        this.props.action();
    }

    dataChange = event =>
    {
        this.setState({update:{text:event.target.value}});
        this.setState({text:event.target.value});
    }

render() {
    return (
        <div id="logform">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm"><h5>{this.state.firstName} {this.state.lastName}</h5></div>
                <div className="col-sm"></div>
            </div>
            <div className="row">
                <div className="col-sm"></div>
                <div className="date col-sm">{this.state.date.substring(0, 10) + " " + this.state.date.substring(11, 16)}</div>
                <div className="col-sm"></div>
            </div>
            <div className="row bg-light">
            <span className="text">{this.state.text}</span>
            </div>
            <Button variant="dark" size="sm" onClick={this.handleShow} hidden={!(this.state.role==="ADMIN")}>
                Edit
            </Button>{" "}
            <Button onClick={this.delete} variant="danger" size="sm" hidden={!(this.state.role==="ADMIN")}>
                Delete
            </Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="modalEdit">
                            <Form.Label>Edit text</Form.Label>
                            <Form.Control as="textarea" rows={3} readOnly={false} defaultValue={this.state.text}
                                          onChange={this.dataChange}/>
                        </Form.Group>
                        <Button onClick={this.edit}>Save Changes</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>

    );
}
}export default AnnCard;
