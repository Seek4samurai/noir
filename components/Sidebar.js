import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userImage = user.photoURL;

  return (
    <>
      <Heading>NOIR</Heading>
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
              <MoreVert></MoreVert>
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #303030;
`;
const Container = styled.div`
  width: 100px;
`;
const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1rem;
  height: 100vh;
  width: 100%;
  border-bottom: 3px solid whitesmoke;
  z-index: 1;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconContainer = styled.div``;
