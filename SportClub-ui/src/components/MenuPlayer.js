import {Navbar,Nav,Form,FormControl,Button,Dropdown,DropdownButton} from 'react-bootstrap';
const MenuPlayer = () => {
    return(
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">B&B Sport</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Schedule</Nav.Link>
              <Nav.Link href="#pricing">Contract</Nav.Link>
            </Nav>
            <DropdownButton id="dropdown-basic-button" drop="left" title="Account">
              <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Change password</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
            </DropdownButton>
          </Navbar>
        </>
    )
}
export default MenuPlayer