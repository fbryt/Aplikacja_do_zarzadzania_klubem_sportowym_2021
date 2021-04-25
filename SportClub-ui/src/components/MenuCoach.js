import {  Navbar,  Nav,  Form,  FormControl,  Button,  Dropdown,  DropdownButton,} from "react-bootstrap";
import { useHistory } from "react-router";
import AuthService from "../services/AuthService";
import Container from 'react-bootstrap/Container'
const MenuCoach = () => {

  const history = useHistory();

  function Logout(){
    AuthService.logout(); 
    history.push('/');
  }

  return (
    <>
      <Navbar collapseOnSelect fixed='top' expand='sm' bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls='reponsive-navbar-nav'/>
        <Navbar.Collapse id='responsive-navbar-nav'>
        <Navbar.Brand href="#">B&B Sport</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Schedule</Nav.Link>
          <Nav.Link href="#">Contract</Nav.Link>
          <Nav.Link href="#">Coach tools</Nav.Link>
        </Nav>
        <DropdownButton id="dropdown-basic-button" drop="left" title="Account">
          <Dropdown.Item href="#">Info</Dropdown.Item>
          <Dropdown.Item href="#">Change password</Dropdown.Item>
          <Dropdown.Item href="#" onClick={Logout}> Logout </Dropdown.Item>
        </DropdownButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  );
};
export default MenuCoach;
