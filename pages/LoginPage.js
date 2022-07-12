import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import Image from "next/image";
import Logo from "../public/icons/noir.png";

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #a589ff;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;

  border-radius: 25px;
  background: #e7e0ff;
  box-shadow: 7px 7px 4px #858585, -7px -7px 4px #ebebeb;
`;
const TextArea = styled.div`
  padding: 1rem 0;
  color: #444444;
  text-align: center;
  font-size: 1.2rem;
  font-weight: normal;
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
            filter: "drop-shadow(4px 4px 2px #858585)",
          }}
        >
          <Image alt="Logo" src={Logo} layout="fill" objectFit="contain" />
        </div>
        <TextArea>Login Using Google</TextArea>
        <Button onClick={signIn} variant="outlined">
          Sign in
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;
