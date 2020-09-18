import React, { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import fb from "../../images/Icon/fb.png";
import google from "../../images/Icon/google.png";
import * as firebase from "firebase/app";
import "firebase/auth";
import "./Login.css";
import { UserContext } from "../../App";
import firebaseConfig from "../../firebase.config";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [User, SetUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: "",
  });
  /////////////// on load header style change /////////////////////////////
  const onload = () => {
    document
      .querySelector(".logo img")
      .style.setProperty("filter", "brightness(0)");
    document
      .querySelector(".search")
      .style.setProperty("filter", "brightness(0)");
    document
      .querySelector(".navbar-nav")
      .style.setProperty("filter", "brightness(0)");
  };

  /////////****************/////////
  const [newUser, SetNewUser] = useState(false);
  const [LoggedInUser, SetLoggedInUser] = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };

  const haldleInput = e => {
    e.preventDefault();
    let isInputValid;

    if (e.target.name === "firstName") {
      isInputValid = e.target.value;
    }
    if (e.target.name === "lastName") {
      isInputValid = e.target.value;
    }
    if (e.target.name === "email") {
      const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isInputValid = validation.test(e.target.value);
    }
    if (e.target.name === "password") {
      const passValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      isInputValid = passValidation.test(e.target.value);
    }
    if (e.target.name === "confirmPassword") {
      const passValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      isInputValid = passValidation.test(e.target.value);
    }

    if (isInputValid) {
      const newUser = { ...User };
      newUser[e.target.name] = e.target.value;
      SetUser(newUser);
    }
  };
  ///////// update  user ///////////////////

  const [validated, setValidated] = useState(false);

  const updateUserInfo = (firstName, lastName) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: `${firstName} ${lastName}`,
      })
      .then(function () {
        // Update successful.
        console.log("user name update successfully");
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  ///////// create  user ///////////////////
  const buttonHandler = e => {
    e.preventDefault();

    if (User.email && User.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(User.email, User.password)
        .then(() => {
          const newUserInfo = { ...User };
          newUserInfo.error = "";
          newUserInfo.success = "User Created Successfully";
          SetUser(newUserInfo);
          updateUserInfo(User.firstName, User.lastName);
        })
        .catch(error => {
          // Handle Errors here.
          var errorMessage = error.message;
          const newUserInfo = { ...User };
          newUserInfo.error = errorMessage;
          newUserInfo.success = "";
          SetUser(newUserInfo);
        });
    }
  };
  ///////// sign in  user ///////////////////
  const submitHandler = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (User.email && User.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(User.email, User.password)
        .then(res => {
          const loginUserInfo = { ...User };
          loginUserInfo.error = "";
          loginUserInfo.success = "User Sign In Successfully";
          console.log(res.user);
          SetUser(res.user);
          SetLoggedInUser(res.user);
          history.replace(from);
        })
        .catch(error => {
          // Handle Errors here.
          var errorMessage = error.message;
          const loginUserInfo = { ...User };
          loginUserInfo.error = errorMessage;
          loginUserInfo.success = "";
          SetUser(loginUserInfo);
        });
    }
    setValidated(true);
  };
  ///////// sign in with fb  ///////////////////
  const fbSignInHandler = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        SetUser(user);
        SetLoggedInUser(user);
        history.replace(from);
        console.log("fb user ingo", user);
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  ///////// sign in with google  ///////////////////

  const googleSignInHandler = e => {
    e.preventDefault();

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        SetUser(result.user);
        SetLoggedInUser(result.user);
        history.replace(from);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorMessage = error.message;
        const userInfos = { ...User };
        userInfos.error = errorMessage;
        userInfos.success = "";
        SetUser(userInfos);
      });
  };

  return (
    <div onLoad={onload}>
      <Header />
      <Card className='loginCard mx-auto p-4 mt-3'>
        <Form
          className='d-flex flex-column'
          noValidate
          validated={validated}
          onSubmit={newUser ? buttonHandler : submitHandler}>
          <Form.Group controlId='formBasicText'>
            {newUser && (
              <Form.Control
                name='firstName'
                type='text'
                placeholder='Enter Your First Name'
                onBlur={haldleInput}
                required
              />
            )}
            <Form.Control.Feedback type='invalid'>
              Please provide Your First Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formBasicText'>
            {newUser && (
              <Form.Control
                name='lastName'
                type='text'
                placeholder='Enter Your Last Name'
                onBlur={haldleInput}
                required
              />
            )}
            <Form.Control.Feedback type='invalid'>
              Please provide Your Last Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              onBlur={haldleInput}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide Your Valid Email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              onBlur={haldleInput}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide Password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            {newUser && (
              <Form.Control
                name='confirmPassword'
                type='password'
                placeholder='Confirm Password'
                onBlur={haldleInput}
                required
              />
            )}
            <Form.Control.Feedback type='invalid'>
              Please provide Confirm Password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formBasicCheckbox' className='w-50 '>
            {!newUser && <Form.Check type='checkbox' label='Remember Me' />}
          </Form.Group>
          <Button className='forgetPass'>
            {!newUser && "Forget Password ?"}
          </Button>
          <Button className='btnLogin' type='submit'>
            {newUser ? "Create an Account" : "Login"}
          </Button>
        </Form>
        <div className='d-flex mt-3 mx-auto'>
          <span>
            {!newUser ? "Don't have an account ?" : "Already have an account ?"}
          </span>
          <Button
            className='createAccount'
            onClick={() => SetNewUser(!newUser)}>
            {!newUser ? "Create an Account" : "Login"}
          </Button>
        </div>
      </Card>
      <div className='d-flex flex-column   otherLogin mx-auto'>
        <p className='my-2 mx-auto'>or</p>
        <Button className='fb' onClick={fbSignInHandler}>
          <img src={fb} alt='' /> Continue With Facebook
        </Button>
        <Button className='google' onClick={googleSignInHandler}>
          <img src={google} alt='' /> Continue With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
