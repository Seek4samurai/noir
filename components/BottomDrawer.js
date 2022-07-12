import { Person } from "@mui/icons-material";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import UserChat from "./UserChat";

const Container = styled.div`
  display: none;
  width: calc(100% - 100px);
  height: fit-content;
  background-color: #d3eeff;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
  box-shadow: 0px -8px 8px 0px rgba(0, 0, 0, 0.5);
  z-index: 100;
  transition: all 0.7s;

  @media (max-height: 968px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 840px) {
    width: 100%;
  }
`;
const AddUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
`;
const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
  transition: all 0.7s;
`;

const BottomDrawer = () => {
  const [user] = useAuthState(auth);
  const [hide, setHide] = useState(true);

  // checking if chat already exists or not
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  const hideDrawer = () => setHide(!hide);

  return (
    <Container>
      <AddUser onClick={hideDrawer}>
        <Person></Person>
        Messages!
      </AddUser>
      {hide ? null : (
        <UserContainer>
          {/* List of chats to be placed here */}
          {chatSnapshot?.docs.map((chat) => (
            <UserChat
              key={chat.id}
              id={chat.id}
              users={chat.data().users}
            ></UserChat>
          ))}
        </UserContainer>
      )}
    </Container>
  );
};

export default BottomDrawer;
