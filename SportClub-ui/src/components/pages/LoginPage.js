import React, {Component} from "react";
import {Form, Col, Card, Button} from "react-bootstrap"
import axios from 'axios';


export default class LoginPage extends Component{


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }
    initialState = {
        login:'',password:''
    }
    submitLogin = event =>
    {
        alert(this.state.name);
        event.preventDefault();
        const user = {
            login: this.state.login,
            password: this.state.password,
        }
        axios.post("localhost:8080/login",user)
            .then(response => {
                if(response.data !=null) {

                    this.setState(this.initialState);
                    alert("ok");
                }
            });
    }
    dataChange = event =>
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        const {login,password} = this.state;
        return (
            <div>
                <h1>Logowanie</h1>

                <Form onSubmit={this.submitLogin} id="LoginForm">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formLogin">
                            <Form.Label>Login</Form.Label>
                            <Form.Control required autoComplete="off" type="login" name="login"  onChange={this.dataChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control required autoComplete="off" type="password" name="password" onChange={this.dataChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button as={Col} variant="success" type="submit">
                            Zaloguj
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }

}


/*<div>
<h1>Logowanie</h1>

<div className="LoginForm">

<label htmlFor="userName">Login</label>
<br/>
<input type="text" placeholder="Enter Username" name="uname" required/>
<br/>
<label htmlFor="password">Hasło</label>
<br/>
<input type="password" placeholder="Enter Password" name="psw" required/>
<br/>
<button type="submit">Zaloguj</button>

</div>

</div>
*/

