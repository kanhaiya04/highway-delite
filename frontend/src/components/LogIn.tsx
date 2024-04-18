import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import "./styles.css";

interface UserData {
  email: string;
  password: string;
}

const LogIn = (props: { toggleScreen: () => void }) => {
  const navigator = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogIn = async () => {
    if (userData.email.length === 0 || userData.password.length === 0)
      return toast("All fields are required");
    const response = await fetch("http://localhost:4000/user/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    toast(json.message);
    if (json.success) {
      localStorage.setItem("token", json.token);
      navigator("/welcome");
    }
  };
  return (
    <Row className="m-0 row1" style={{ width: "100%" }}>
      <Col
        xs="12"
        md="6"
        className="d-flex justify-content-center align-items-center"
      >
        <img src="./logIn.jpg" alt="signUp img" width={"100%"} />
      </Col>
      <Col
        xs="12"
        md="6"
        className="col2 d-flex justify-content-center align-items-center"
      >
        <Container
          style={{
            border: "solid",
            borderColor: "#7f84877c",
            borderWidth: "thin",
            borderRadius: "5%",
          }}
          className="mainContainer d-flex justify-content-center align-items-center"
        >
          <Row className="p-0">
            <Row className="m-0 dynamicPadding">
              <h1 className="mainHeading" style={{ fontWeight: "900" }}>
                Fill what we know
                <span style={{ color: "red" }}> !</span>
              </h1>
            </Row>
            <Row className="m-0 dynamicPadding">
              <Form>
                <Form.Group className="pb-4">
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input"
                    onChange={handleChange}
                  />
                </Form.Group>
                <InputGroup className="pb-4">
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input"
                    onChange={handleChange}
                  />
                  <InputGroup.Text
                    onClick={handleTogglePassword}
                    className="input"
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </Row>
            <Row className="m-0 dynamicPadding">
              <Row className="m-0 pb-3">
                <Button
                  style={{
                    backgroundColor: "#3A244A",
                    fontWeight: "500",
                    fontSize: "1.5rem",
                    borderRadius: "10px",
                    borderBlockColor: "#3A244A",
                  }}
                  onClick={handleLogIn}
                >
                  LogIn
                </Button>
              </Row>
              <Row className="m-0">
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#ffffff",
                    fontWeight: "500",
                    fontSize: "1.5rem",
                    borderRadius: "10px",
                    borderBlockColor: "#3A244A",
                  }}
                  onClick={props.toggleScreen}
                >
                  SignUp
                </Button>
              </Row>
            </Row>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default LogIn;
