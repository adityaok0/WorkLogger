import React, { createRef } from "react";
import { Button, Col, FormControl, Form, Row } from "react-bootstrap";
import switchOn from "./switchon.svg";
import email from "./email.svg";
import lock from "./lock.svg";
import eye from "./eye.svg";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDataAction } from "./actions/actions";
import httpClient from "./httpClient";
import { useHistory } from "react-router";
export function Login() {
  const passwordRef = createRef();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.LoginDataReducer);
  const history = useHistory();
  function showOrHidePassword() {
    passwordRef.current.type =
      passwordRef.current.type === "password" ? "text" : "password";
  }
  function authorizeUser(e) {
    e.preventDefault();
    httpClient.post({ data: loginData }).then((res) => {
      history.push("/dashboard");
    });
  }
  function setLoginData(value, type) {
    dispatch(setLoginDataAction(value, type));
  }
  return (
    <React.Fragment>
      <Row className="h-100 m-0">
        <Col
          lg={6}
          className="d-flex flex-column align-items-center justify-content-center leftBox py-5"
        >
          <img src={switchOn} alt="logo" className="switchOnLogo my-5" />
        </Col>
        <Col
          lg={6}
          className="d-flex flex-column align-items-center justify-content-center py-5"
        >
          <Form
            className="d-flex flex-column my-5"
            onSubmit={(e) => authorizeUser(e)}
          >
            <h1 className="toDoHeading">To- Do App</h1>
            <Form.Group className="position-relative" controlId="formEmail">
              <FormControl
                className="emailBox"
                type="text"
                placeholder="Email ID"
                value={loginData.email ?? ""}
                onChange={(e) => setLoginData(e.target.value, "email")}
              />
              <img src={email} alt="email" className="emailIcon" />
            </Form.Group>
            <Form.Group className="position-relative" controlId="formPassword">
              <FormControl
                className="passwordBox"
                type="password"
                ref={passwordRef}
                placeholder="Password"
                value={loginData.password ?? ""}
                onChange={(e) => setLoginData(e.target.value, "password")}
              />
              <img src={lock} alt="lock" className="lockIcon" />
              <img
                src={eye}
                alt="eye"
                className="eyeIcon"
                onClick={showOrHidePassword}
              />
            </Form.Group>
            <Button className="loginButton" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}
