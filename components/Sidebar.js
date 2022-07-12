import Link from "next/link";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { AddCircleOutlined, Logout, Search } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userImage = user.photoURL;

  // checking if chat already exists or not
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Enter an Email address: ");
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatExist(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatExist = (recipientEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <>
      <Container>
        <Header>
          <Link href="/">
            <a>
              <UserAvatar src={userImage}></UserAvatar>
            </a>
          </Link>
          <IconContainer>
            <SideButtons>
              <AddButton>
                <AddCircleOutlined
                  onClick={createChat}
                  style={{
                    cursor: "pointer",
                    color: "white",
                    width: "40px",
                    height: "40px",
                  }}
                ></AddCircleOutlined>
              </AddButton>
              <SearchButton>
                <Search
                  style={{
                    cursor: "pointer",
                    color: "white",
                    width: "40px",
                    height: "40px",
                  }}
                ></Search>
              </SearchButton>
            </SideButtons>
            <LogOutButton
              onClick={() => {
                auth.signOut();
              }}
            >
              <Logout
                style={{
                  cursor: "pointer",
                  color: "white",
                  width: "40px",
                  height: "40px",
                }}
              ></Logout>
            </LogOutButton>
          </IconContainer>
        </Header>
      </Container>
    </>
  );
};

export default Sidebar;

// Styles here
const Container = styled.div`
  width: 100px;
  border-radius: 0px 50px 0px 0px;

  background: rgb(154, 122, 255);
  background: linear-gradient(
    180deg,
    rgba(154, 122, 255, 1) 74%,
    rgba(0, 166, 128, 1) 100%
  );
  @media only screen and (max-width: 840px) {
    width: 0px;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  height: 100vh;
  width: 100%;
  z-index: 1;
  @media only screen and (max-width: 840px) {
    background: rgb(154, 122, 255);
    background: linear-gradient(
      180deg,
      rgba(154, 122, 255, 1) 74%,
      rgba(0, 166, 128, 1) 100%
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  @media only screen and (max-width: 840px) {
    width: 100%;
    flex-direction: row;
  }
`;
const SideButtons = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 840px) {
    flex-direction: row;
  }
`;
const SearchButton = styled(Button)`
  padding: 0 16px;
  min-width: 0;
  transition: all 0.4s;
  @media only screen and (max-width: 840px) {
    padding: 0 10px;
    transform: scale(0.7);
  }
`;
const AddButton = styled(Button)`
  padding: 0 16px;
  min-width: 0;
  transition: all 0.4s;
  @media only screen and (max-width: 840px) {
    padding: 0 10px;
    transform: scale(0.7);
  }
`;
const LogOutButton = styled(Button)`
  padding: 0 16px;
  min-width: 0;
  transition: all 0.4s;
  @media only screen and (max-width: 840px) {
    padding: 0 10px;
    transform: scale(0.7);
  }
`;
