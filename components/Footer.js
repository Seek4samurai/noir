import { Button } from "@mui/material";
import { AddCircleOutlined } from "@mui/icons-material";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import UserChat from "./UserChat";

const Footer = () => {
  const [user] = useAuthState(auth);

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
    <Container>
      <Main>
        <UsersContainer>
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
        </UsersContainer>
      </Main>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: calc(100% - 100px);
  position: absolute;
  bottom: 0;
  right: 0;

  @media (max-height: 968px) {
    display: none;
  }
  @media only screen and (max-width: 840px) {
    width: 100vw;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const UsersContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
`;
const SidebarButton = styled(Button)`
  min-width: 0;
  transition: all 2s ease-in-out;
  :hover {
    background-color: #d3eeff;
  }
`;
const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;

  @media only screen and (max-width: 840px) {
    padding: 0 10px;
    transform: scale(0.7);
  }
`;
