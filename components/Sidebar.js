import { MoreVertOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import noirLogo from "../public/favicon.ico";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userImage = user.photoURL;

  return (
    <>
      <Heading>
        NOIR{" "}
        <Image
          src={noirLogo}
          alt="noir Logo"
          width={"30px"}
          height={"30px"}
        ></Image>
      </Heading>
      <Container>
        <Header>
          <Link href="/">
            <a>
              <UserAvatar src={userImage}></UserAvatar>
            </a>
          </Link>
          <IconContainer>
            <IconButton
              onClick={() => {
                auth.signOut();
              }}
            >
              <MoreVertOutlined
                fontSize="large"
                style={{ color: "white" }}
              ></MoreVertOutlined>
            </IconButton>
          </IconContainer>
        </Header>
      </Container>
    </>
  );
};

export default Sidebar;

// Styles here
const Heading = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #303030;
  z-index: 2;
  @media only screen and (max-width: 840px) {
    color: white;
    font-size: 1.2rem;
  }
`;
const Container = styled.div`
  width: 100px;
  background: linear-gradient(
    0deg,
    rgba(133, 90, 255, 1) 0%,
    rgba(124, 218, 255, 1) 100%
  );
  border-radius: 0px 50px 0px 0px;

  @media only screen and (max-width: 840px) {
    width: 0px;
  }
`;
const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 100vh;
  width: 100%;
  z-index: 1;

  @media only screen and (max-width: 840px) {
    background: linear-gradient(
      0deg,
      rgba(133, 90, 255, 1) 0%,
      rgba(124, 218, 255, 1) 100%
    );
    border-radius: 0px 0px 20px 20px;

    width: 100vw;
    height: fit-content;
    flex-direction: row;
    padding: 0.4rem;
    z-index: 1;
  }
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  width: 55px !important;
  height: 55px !important;
  border: 4px solid white;
  :hover {
    border-color: white;
    opacity: 0.8;
  }

  @media only screen and (max-width: 840px) {
    width: 40px !important;
    height: 40px !important;
  }
`;
const IconContainer = styled.div`
  fill: black !important;
`;
