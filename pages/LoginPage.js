import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import Image from "next/image";
import Logo from "../public/Logo.png";

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: rgb(225, 241, 255);
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  border-radius: 8px;
  background-color: white;
`;

const LoginPage = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <div
          style={{
            width: "120px",
            height: "200px",
            position: "relative",
            marginBottom: "40px",
          }}
        >
          <Image alt="Logo" src={Logo} layout="fill" objectFit="contain" />
        </div>
        <Button onClick={signIn} variant="outlined">
          Sign in
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;
