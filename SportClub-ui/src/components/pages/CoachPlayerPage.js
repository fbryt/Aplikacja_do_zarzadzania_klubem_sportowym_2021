import React, { useEffect, useState } from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import axios from "axios";
import { Container } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

const url = "http://localhost:8080/appUsers/";

export const CoachPlayerPage = () => {

    const [data, setData] = useState([]);
    useEffect(async () => {
        await axios.get(url).then(response => {
            setData(response.data._embedded.appUserList);
        }).catch(error => {
            console.log(error);
        });

    }, []);

    const columns = [{
            dataField: 'id',
            text: 'User ID',
            sort: true,
            editable: false,
        },
        {
        dataField: 'firstName',
        text: 'First Name',
        sort: true,
        editable: false,
        filter: textFilter()
    }, {
        dataField: 'lastName',
        text: 'Last Name',
        sort: true,
        editable: false,
        filter: textFilter()
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true,
        editable: false,
        filter: textFilter()
    }, {
        dataField: 'appUserRole',
        text: 'Role',
        sort: true,
        editor: {
            type: Type.SELECT,
            options: [{
                value: 'COACH',
                label: 'Coach'
            }, {
                value: 'PLAYER',
                label: 'Player'
            }, {
                value: 'ADMIN',
                label: 'Admin'
            }]
        }
    },{
            dataField: 'coach_Id',
            text: 'Coach Id'
        }];

    const columnsCoach = [{
        dataField: 'id',
        text: 'User ID',
        sort: true,
        editable: false,
    },
        {
            dataField: 'firstName',
            text: 'First Name',
            sort: true,
            editable: false,
            filter: textFilter()
        }, {
            dataField: 'lastName',
            text: 'Last Name',
            sort: true,
            editable: false,
            filter: textFilter()
        }, {
            dataField: 'email',
            text: 'Email',
            sort: true,
            editable: false,
            filter: textFilter()
        }, {
            dataField: 'appUserRole',
            text: 'Role',
            sort: true,
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'COACH',
                    label: 'Coach'
                }, {
                    value: 'PLAYER',
                    label: 'Player'
                }, {
                    value: 'ADMIN',
                    label: 'Admin'
                }]
            }
        }];


    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }]

    const hiddenRowKeys = ['COACH', 'ADMIN'];
    const hideRowKeys = ['PLAYER', 'ADMIN'];

    const onCellSave = async (oldValue, newValue, row, column) => {
        const update = {
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            appUserRole: row.appUserRole,
            coach_Id: row.coach_Id
        }
        try {
            const url = "http://localhost:8080/appUsers/" + row.id;
            await axios.patch(url, update);
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    return (
        <div>
            <Menu />
            <Container text style={{ marginTop: '7em' }}>
                <div id="mainInscript">
                    <h1 data-testid="required-h1">Players</h1>
                </div>
                <BootstrapTable
                    bootstrap4
                    keyField="appUserRole"
                    data={data}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    noDataIndication="Table is Empty"
                    filter={filterFactory()}
                    hiddenRows={ hiddenRowKeys }
                    pagination={paginationFactory()}
                    cellEdit={cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                        afterSaveCell: onCellSave
                    })}
                />
            </Container>

            <Container text style={{ marginTop: '7em' }}>
                <div id="mainInscript">
                    <h1 data-testid="required-h1">Coaches</h1>
                </div>
                <BootstrapTable
                    bootstrap4
                    keyField="appUserRole"
                    data={data}
                    columns={columnsCoach}
                    defaultSorted={defaultSorted}
                    noDataIndication="Table is Empty"
                    filter={filterFactory()}
                    hiddenRows={ hideRowKeys }
                    pagination={paginationFactory()}
                    cellEdit={cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                        afterSaveCell: onCellSave
                    })}
                />
            </Container>
            <Footer />
        </div >
    )
}

export default CoachPlayerPage;