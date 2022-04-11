import styled from "styled-components";
import { AddCircleOutlined } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import UserChat from "./UserChat";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { Button } from "@mui/material";

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
const SidebarButton = styled(Button)`
  min-width: 0;
  transition: all 0.7s;
  :hover {
    background-color: #d3eeff;
  }
`;
const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;

  @media only screen and (max-width: 840px) {
    padding: 0 5px;
    transform: scale(0.7);
  }
`;

const BottomDrawer = () => {
  const [user] = useAuthState(auth);
  const [hide, setHide] = useState(true);

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

  // checking if chat already exists or not
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  const hideDrawer = () => setHide(!hide);

  return (
    <Container>
      <AddUser onClick={hideDrawer}>
        <AddCircleOutlined></AddCircleOutlined>
        Create chat!
      </AddUser>
      {hide ? null : (
        <UserContainer>
          <AddButton>
            <SidebarButton onClick={createChat}>
              <AddCircleOutlined
                fontSize="large"
                style={{ color: "#2b95ff", width: "60px", height: "60px" }}
              ></AddCircleOutlined>
            </SidebarButton>
          </AddButton>
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
