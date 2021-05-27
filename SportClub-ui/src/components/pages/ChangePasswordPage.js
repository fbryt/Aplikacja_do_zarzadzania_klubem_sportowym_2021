import React, {Component} from "react";
import {Form, Col, Container, InputGroup} from 'react-bootstrap';
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
        const { label, name, inClass } = this.props;
        return(
            <Form.Group as={Col}>
                <div className="password">
                    <Form.Label>{label}</Form.Label>
                    <InputGroup>
                        <Form.Control className={inClass} required autoComplete="off" type={this.state.type} name={name} onChange={this.onDataChange} />
                        <img alt={this.state.type === 'password' ? 'Show' : 'Hide'} title={this.state.type === 'password' ? 'Show Password': 'Hide Password'} src={this.state.type === 'password' ? '/show_password.png' :'/hide_password.png'} className="passwordShow" onClick={this.toggleShow}/>
                    </InputGroup>
                </div>
            </Form.Group>
        )
    }

}

export default class ChangePassword extends Component{

    constructor(para) {
        super(para);
        this.state = { input:{oldpassword:'', password:'',confirmpassword:''},errors: {confirmpassword: '', oldpassword: ''}};

        this.handleCallback = this.handleCallback.bind(this);
    }

    changePassword = async(event) =>{

      const password = this.state.input.password;
      const oldpassword = this.state.input.oldpassword;
      const confirmpassword = this.state.input.confirmpassword;
      let errors = this.state.errors;
      event.preventDefault();
      if( this.state.input.password === this.state.input.confirmpassword) {
          try{
              const url ="http://localhost:8080/settings/password";
              const response = await axios.post(url,{oldpassword:oldpassword, password:password}).then(() => {
                  this.props.history.push(`/dashboard`);
                  });
          } catch(e){
              errors.oldpassword = "Invalid password!";
              console.log(`Axios request failed: ${e}`);
          }
      }
      else{
          errors.confirmpassword = "Passwords do not match!";
      }
        this.setState(errors);
    }


    handleCallback(pass,data){
        let input = this.state.input;
        input[pass] = data;
        this.setState({input});
    }


    render(){
        let errors = this.state.errors;
        this.state.errors = {};
        return (
            <div id="change-password-form">
                <Menu/>
                <Container>
                    <div id="changepasswordform">
                        <div id="mainInscript">
                            <h1>Change Password</h1>
                        </div>
                        <Form onSubmit={this.changePassword} id="changePasswordForm">
                            <PasswordField label="Current Password" name="oldpassword" inClass={errors.oldpassword ? 'invalid' : ''} parentCallback={this.handleCallback}/>
                            <div>
                                <h6 style={{color:"red"}} >{errors.oldpassword}</h6>
                            </div>
                            <PasswordField label="New Password" name="password"  inClass={errors.confirmpassword ? 'invalid' : ''} parentCallback={this.handleCallback}/>
                            <PasswordField label="Confirm Password" name="confirmpassword" inClass={errors.confirmpassword ? 'invalid' : ''} parentCallback={this.handleCallback}/>
                            <div>
                                <h6 style={{color:"red"}} >{errors.confirmpassword}</h6>
                            </div>
                            <div id="button" className="row">
                                <div className="col-sm">
                                </div>
                                <div className="col-sm">
                                    <button className="btn btn-dark justify-content-center">Change Password</button>
                                </div>
                                <div className="col-sm">
                                </div>
                            </div>
                        </Form>
                    </div>
                </Container>
                <Footer/>
            </div>
        )
    }

};