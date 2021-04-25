import {  Navbar,  Nav,  Form,  FormControl,  Button,  Dropdown,  DropdownButton,} from "react-bootstrap";
import { useHistory } from "react-router";
import AuthService from "../services/AuthService";

const MenuCoach = () => {

  const history = useHistory();

  function Logout(){
    AuthService.logout(); 
    history.push('/');
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">B&B Sport</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Schedule</Nav.Link>
          <Nav.Link href="#pricing">Contract</Nav.Link>
          <Nav.Link href="#console">Coach tools</Nav.Link>
        </Nav>
        <DropdownButton id="dropdown-basic-button" drop="left" title="Account">
          <Dropdown.Item href="#">Info</Dropdown.Item>
          <Dropdown.Item href="#">Change password</Dropdown.Item>
          <Dropdown.Item href="#" onClick={Logout}> Logout </Dropdown.Item>
        </DropdownButton>
      </Navbar>
    </>
  );
};
export default MenuCoach;
