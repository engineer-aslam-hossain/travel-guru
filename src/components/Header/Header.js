import React, { useContext } from "react";
import { Button, FormControl, InputGroup, Nav, Navbar } from "react-bootstrap";
import logo from "../../images/Icon/Logo.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [LoggedInUser, SetLoggedInUser] = useContext(UserContext);
  const signOut = () => {
    SetLoggedInUser({});
    console.log("logout succesfully");
  };
  return (
    <Navbar className='navbar mx-5 pt-3' expand='lg'>
      <Link to='/' className='logo'>
        <img src={logo} alt='' />
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <InputGroup className='search'>
        <InputGroup.Prepend>
          <InputGroup.Text id='basic-addon1'>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className='searchInput'
          placeholder='Search Your Destination....'
          aria-label='Username'
          aria-describedby='basic-addon1'
        />
      </InputGroup>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='d-flex justify-content-around w-100'>
          <Nav.Link href='#home'>News</Nav.Link>
          <Nav.Link href='#link1'>Destination</Nav.Link>
          <Nav.Link href='#link2'>Blog</Nav.Link>
          <Nav.Link href='#link3'>Contact</Nav.Link>
          <span className='mr-2 mt-2 font-weight-bold text-success'>
            {LoggedInUser.displayName}
          </span>
        </Nav>
        <Link to='/login' className='text-decoration-none buttonText'>
          <Button
            id='loginBTn'
            className='login'
            variant='outline-success'
            onClick={LoggedInUser.email && signOut}>
            {!LoggedInUser.email ? "Login" : "Logout"}
          </Button>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
