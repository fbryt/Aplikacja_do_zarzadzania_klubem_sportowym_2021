import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {getJwt} from "./pages/GetJwt";


class AuthComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        };
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login');
        }

        axios.get('/appUsers', { headers: { Authorization: `Bearer ${jwt}` } }).then(res => this.setState({
            user: res.data
        })).catch(err => {
            localStorage.removeItem('jwt');
            this.props.history.push('/login');
        });
    }

    render() {
        if (this.state.user === undefined) {
            return (
                <div></div>
            );
        }

        return (
            <div>
                {this.props.children}
            </div>
        );
    }


}

export default withRouter(AuthComponent);