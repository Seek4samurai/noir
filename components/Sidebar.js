import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import Footer from "./Footer";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const redirectToChats = () => {
    console.log("redirect");
    return <Footer></Footer>;
  };

  return (
    <Container>
      <Header>
        <UserAvatar
          src={user.photoURL}
          onClick={() => {
            auth.signOut();
          }}
        ></UserAvatar>
        <IconContainer>
          <IconButton onClick={() => redirectToChats()}>
            <MoreVert></MoreVert>
          </IconButton>
        </IconContainer>
      </Header>
    </Container>
  );
};

export default Sidebar;

// Styles here
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
