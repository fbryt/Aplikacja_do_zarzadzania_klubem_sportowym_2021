import React, {Component} from "react";
import {Form, Col,  Button} from "react-bootstrap"
import axios from 'axios';


export default class LoginPage extends Component{


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }
    initialState = {
        email:'',
        password:''
    }
    submitLogin = event =>
    {

        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(user);
        axios.post("http://localhost:8080/login",user)
            .then(response => {
                if(response.data !=null) {

                    this.setState(this.initialState);
                    alert("works");
                }
            })
            .catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response) } });
    }
    dataChange = event =>
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }


    render() {
        const {email,password} = this.state;
        return (
            <div>
                <h1>Logowanie</h1>

                <Form onSubmit={this.submitLogin} id="LoginForm">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Login</Form.Label>
                            <Form.Control required autoComplete="off" type="email" name="email"  onChange={this.dataChange} />
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
                        <Button variant="success" type="submit">
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

