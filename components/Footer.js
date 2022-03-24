import { Button } from "@material-ui/core";
import { AddCircleOutline, Search } from "@material-ui/icons";
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
              <AddCircleOutline fontSize="large"></AddCircleOutline>
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
  overflow: scroll;
  width: 100%;
`;
const SidebarButton = styled(Button)`
  min-width: 0;
`;
const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
