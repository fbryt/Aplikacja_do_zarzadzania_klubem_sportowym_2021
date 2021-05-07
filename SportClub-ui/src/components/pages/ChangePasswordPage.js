import React, {Component} from "react";
import {Form, Button, Col, Container, Row, Badge, InputGroup} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';


import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
class PasswordField extends Component
{
    constructor(para){
        super(para);
        this.state = { type: 'password', input: '' };
        this.onDataChange = this.onDataChange.bind(this);
    }

    toggleShow = () => this.setState(({type}) =>({
        type: type === 'password' ? 'text' : 'password'
    }))

    onDataChange(event){
        let input = this.state.input;
        input = event.target.value;
        this.props.parentCallback(this.props.name,input);
    }

    render(){
        const { label, name } = this.props;
        return(
            <Form.Group as={Col}>
                <div className="password">
                    <Form.Label>{label}</Form.Label>
                    <InputGroup>
                        <Form.Control required autoComplete="off" type={this.state.type} name={name} onChange={this.onDataChange} />
                        <span className="passwordShow" onClick={this.toggleShow}>{this.state.type === 'password' ? 'Show' : 'Hide'}</span>
                    </InputGroup>
                </div>
            </Form.Group>
        )
    }

}

export default class ChangePassword extends Component{

    constructor(para) {
        super(para);
        this.state = { input:{oldpassword:'', password:'',confirmpassword:''}, errors:{}, type:'password'};

        this.validate = this.validate.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
    }

    changePassword = async(event) =>{

      const password = this.state.input.password;
      const oldpassword = this.state.input.oldpassword;
      const confirmpassword = this.state.input.confirmpassword;
      event.preventDefault();
      if( this.validate()) {
          const url ="http://localhost:8080/settings/password";
          alert(password + " stare: " + oldpassword + " potwierdzenie: " + confirmpassword);
          await axios.post(url,{oldpassword:oldpassword, password:password});
      }
    }

    validate(){
        return true;
    }

    handleCallback(pass,data){
        let input = this.state.input;
        input[pass] = data;
        this.setState({input});
    }


    render(){
        return (
            <div id="change-password-form">
                <Menu/>
                <Container>
                    <div id="changepasswordform">
                        <div id="mainInscript">
                            <h1>Change Password</h1>
                        </div>
                        <Form onSubmit={this.changePassword} id="changePasswordForm">

                            <PasswordField label="Current Password" name="oldpassword" parentCallback={this.handleCallback}/>
                            <PasswordField label="New Password" name="password" parentCallback={this.handleCallback}/>
                            <PasswordField label="Confirm Password" name="confirmpassword" parentCallback={this.handleCallback}/>
                            <div id="button" className="row">
                                <button>Submit</button>
                            </div>

                        </Form>
                    </div>;
                </Container>
                <Footer/>
            </div>
        )
    }

};