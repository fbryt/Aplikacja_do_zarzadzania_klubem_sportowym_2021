import {Navbar,Nav,Form,FormControl,Button,Dropdown,DropdownButton} from 'react-bootstrap';
const MenuPlayer = () => {
    return(
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">B&B Sport</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Schedule</Nav.Link>
              <Nav.Link href="#">Contract</Nav.Link>
            </Nav>
            <DropdownButton id="dropdown-basic-button" drop="left" title="Account">
              <Dropdown.Item href="#">Info</Dropdown.Item>
              <Dropdown.Item href="#">Change password</Dropdown.Item>
              <Dropdown.Item href="#">Logout</Dropdown.Item>
            </DropdownButton>
          </Navbar>
        </>
    )
}
export default MenuPlayer