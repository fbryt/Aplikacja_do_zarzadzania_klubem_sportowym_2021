import React, { useEffect, useState } from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import axios from "axios";
import { Container } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button,Modal} from "react-bootstrap"

const url = "http://localhost:8080/appUsers/players";

export const MyPlayersPage = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [injuryData,setInjuryData]=useState(false);
    const [data, setData] = useState([]);
    useEffect(async () => {
        await axios.get(url).then(response => {
            setData(response.data._embedded.appUserList);
        }).catch(error => {
            console.log(error);
        });


    }, []);

    const onClk = async (mdl) => {
       setInjuryData(mdl);
        handleShow();
    }

    const columns = [{
        dataField: 'id',
        text: 'User ID',
        sort: true,
    }, {
        dataField: 'firstName',
        text: 'First Name',
        sort: true,
        filter: textFilter(),
        editable: false
    }, {
        dataField: 'lastName',
        text: 'Last Name',
        sort: true,
        filter: textFilter(),
        editable: false
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true,
        filter: textFilter(),
        editable: false
    }, {
        dataField: 'injury.id',
        text: 'Health',
        isDummyField: true,
        editable: false,

        formatter: (cell, row, rowIndex) => {
          if(data[rowIndex].injury==null){
              return <h6 class="text-success">Healthy</h6>
          }else return <h6 onClick={()=>onClk(data[rowIndex].injury)} class="bad"  >Injured</h6>
        }
    }];

    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }]



    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Injury details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>From</h5>
                    {injuryData.start_date?injuryData.start_date.substring(0,10):""}
                    <h5>To</h5>
                    {injuryData.end_date?injuryData.end_date.substring(0,10):""}
                    <h5>Description</h5>
                    {injuryData.description}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Menu />
            <Container style={{ marginTop: '7em' }}>
                <div id="mainInscript">
                    <h1 data-testid="required-h1">My players</h1>
                </div>
                <BootstrapTable
                    bootstrap4
                    striped
                    hover
                    bordered
                    headerWrapperClasses="bg-dark text-white"
                    bodyClasses="bg-light text-dark"
                    keyField="id"
                    data={data}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    noDataIndication="Table is Empty"
                    filter={filterFactory()}
                    pagination={paginationFactory()}

                />
            </Container>
            <Footer />
        </div >
    )
}

export default MyPlayersPage;