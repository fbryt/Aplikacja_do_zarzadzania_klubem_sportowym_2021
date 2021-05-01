import React, { useEffect, useState } from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

const url = "http://localhost:8080/appUsers/";

export const AppUserPage = () => {

    const history = useHistory();

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
        sort: true
    }, {
        dataField: 'firstName',
        text: 'First Name',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'lastName',
        text: 'Last Name',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true,
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

    const onCellSave = async (oldValue, newValue, row, column) => {
        const update = {
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            appUserRole: row.appUserRole
        }
        console.log(update);
        try {
            const url = "http://localhost:8080/appUsers/" + row.id;
            await axios.patch(url, update);
            history.push(`/appUsers`)
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    return (
        <div>
            <Menu />
            <Container text style={{ marginTop: '7em' }}>
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={data}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    noDataIndication="Table is Empty"
                    filter={filterFactory()}
                    pagination={paginationFactory()}
                    cellEdit={cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                        afterSaveCell: onCellSave
                    })}
                />

                {


                /* <h1>App Users</h1>
                <Table className="my-gradient2" responsive striped borderless hover style={{ borderRadius: '10px' }}>
                    <thead className="my-gradient">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user) => {
                                return <tr>
                                    <th><Link to={"/appUsers/" + user.id}>{user?.firstName}</Link></th>
                                    <th>{user?.lastName}</th>
                                    <th>{user?.appUserRole}</th>
                                </tr>
                            })
                        }
                    </tbody>
                </Table> */}
            </Container>
            <Footer />
        </div >
    )
}

export default AppUserPage;