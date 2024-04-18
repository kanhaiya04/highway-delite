import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { toast } from "react-toastify";

type ContactMode = "phone" | "email";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  contactMode: ContactMode;
  otp: string;
}

const SignUp = (props: { toggleScreen: () => void }) => {
  const navigator = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    contactMode: "email",
    otp: "",
  });

  const [otpInput, setOtpInput] = useState(false);

  const toggleOtpField = () => {
    if (otpInput) setOtpInput(false);
    else setOtpInput(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handleSignUp = async () => {
    if (
      userData.firstName.length === 0 ||
      userData.lastName.length === 0 ||
      userData.email.length === 0 ||
      userData.password.length === 0
    )
      return toast("All fields are required");
    if (userData.password !== userData.rePassword) {
      toast("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:4000/otp/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userData.email }),
    });
    const json = await response.json();
    toast(json.message);
    if (json.success) {
      toggleOtpField();
    }
  };

  const handleVerifyOTP = async () => {
    if (
      userData.firstName.length === 0 ||
      userData.lastName.length === 0 ||
      userData.email.length === 0 ||
      userData.password.length === 0 ||
      userData.otp.length === 0
    )
      return toast("All fields are required");
    const response = await fetch("http://localhost:4000/user/signUp", {
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
        <img src="./signUp.jpg" alt="signUp img" width={"100%"} />
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
              <Col className="d-flex align-items-center">
                <h1 className="mainHeading" style={{ fontWeight: "900" }}>
                  <span style={{ color: "#3A244A" }}>Let us know</span>
                  <span style={{ color: "#D72638" }}> !</span>
                </h1>
              </Col>
              <Col
                xs="auto"
                className="d-flex align-items-center justify-content-end"
              >
                <p
                  onClick={props.toggleScreen}
                  style={{
                    margin: "0",
                    textDecoration: "underline",
                    fontWeight: "500",
                  }}
                >
                  <span
                    style={{ color: "#3A244A", textDecorationColor: "#3A244A" }}
                  >
                    Sign
                  </span>
                  <span
                    style={{ color: "#D72638", textDecorationColor: "#D72638" }}
                  >
                    {" "}
                    In
                  </span>
                </p>
              </Col>
            </Row>
            <Row className=" m-0 dynamicPadding">
              <Form>
                <Form.Group className="pb-4">
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="input"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="pb-4">
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="LastName"
                    className="input"
                    onChange={handleChange}
                  />
                </Form.Group>

                <InputGroup className="pb-4">
                  <Form.Control
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Set Password"
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
                <InputGroup className="pb-4">
                  <Form.Control
                    name="rePassword"
                    type={showRePassword ? "text" : "password"}
                    placeholder="Retype Password"
                    className="input"
                    onChange={handleChange}
                  />
                  <InputGroup.Text
                    onClick={handleToggleRePassword}
                    className="input"
                  >
                    {showRePassword ? <EyeSlash /> : <Eye />}
                  </InputGroup.Text>
                </InputGroup>
                <Form.Group className="pb-4">
                  <Form.Select
                    name="contactMode"
                    className="input"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setUserData({
                        ...userData,
                        contactMode: e.target.value as ContactMode,
                      });
                    }}
                    aria-label="Default select example"
                  >
                    <option style={{ color: "#7f8487b1" }}>Contact Mode</option>
                    <option value="email">Email</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="pb-4">
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input"
                    onChange={handleChange}
                  />
                </Form.Group>
                {otpInput && (
                  <Form.Group className="pb-4">
                    <Form.Control
                      name="otp"
                      type="text"
                      placeholder="OTP"
                      className="input"
                      onChange={handleChange}
                    />
                  </Form.Group>
                )}
              </Form>
            </Row>
            <Row className="m-0 dynamicPadding">
              {otpInput ? (
                <Button
                  style={{
                    backgroundColor: "#3A244A",
                    fontWeight: "500",
                    fontSize: "1.5rem",
                    borderRadius: "10px",
                    borderBlockColor: "#3A244A",
                  }}
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </Button>
              ) : (
                <Button
                  style={{
                    backgroundColor: "#3A244A",
                    fontWeight: "500",
                    fontSize: "1.5rem",
                    borderRadius: "10px",
                    borderBlockColor: "#3A244A",
                  }}
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              )}
            </Row>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUp;
