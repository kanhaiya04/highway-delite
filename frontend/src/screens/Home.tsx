import React, { useState } from "react";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import { Container } from "react-bootstrap";

const Home = () => {
  const [screen, setScreen] = useState("signup");

  const toggleScreen = () => {
    if (screen === "signup") setScreen("login");
    else setScreen("signup");
  };

  return (
    <Container
      fluid
      style={{ height: "100vh" }}
      className="d-flex align-items-center"
    >
      {screen === "signup" ? (
        <SignUp toggleScreen={toggleScreen} />
      ) : (
        <LogIn toggleScreen={toggleScreen} />
      )}
    </Container>
  );
};

export default Home;
