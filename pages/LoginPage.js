import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";

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
const Logo = styled.img`
  height: 200px;
  width: 120px;
  margin-bottom: 40px;
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
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"></Logo>
        <Button onClick={signIn} variant="outlined">
          Sign in
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;
