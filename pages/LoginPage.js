import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import Image from "next/image";
import Logo from "../public/icons/noir.png";
import BgGif from "../public/BgGif.gif";
import Google from "../public/icons/Google.png";

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
  padding: 60px;

  z-index: 99;

  border-radius: 18px;
  background: #f2e5ff;
  box-shadow: 9px 9px 5px #7b7582, -9px -9px 5px #ffffff;
`;
const TextArea = styled.div`
  /* padding: 1rem 0; */
  color: #444444;
  text-align: center;
  font-size: 1.2rem;
  font-weight: normal;
`;
const BgImage = styled.div`
  position: absolute;
  top: 0%;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
  filter: blur(10px) saturate(0.2);

  z-index: 1;
`;

const LoginPage = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <BgImage>
        <Image src={BgGif} alt="BgGif" layout="fill"></Image>
      </BgImage>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <div
          style={{
            height: "80px",
            width: "150px",
          }}
        >
          <Image src={Google} alt="Google" layout="intrinsic"></Image>
        </div>
        <TextArea
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          Sign in<br></br>to continue to HeyNoir
        </TextArea>
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
        <Button onClick={signIn} variant="outlined">
          Sign in
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;
