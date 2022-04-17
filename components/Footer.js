import styled from "styled-components";
import UserChat from "./UserChat";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const Footer = () => {
  const [user] = useAuthState(auth);

  // checking if chat already exists or not
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  return (
    <Container>
      <Main>
        <UsersContainer>
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
