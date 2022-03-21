import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";

const Container = styled.div`
  /* height: 80px; */
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;

  height: 80px;
  display: flex;
  align-items: center;
  border: 1px solid whitesmoke;
`;

const ChatAvatar = styled(Avatar)`
  margin-left: 1rem;
`;

const HeaderInformation = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  > h4 {
    margin: 0px;
  }
  > p {
    margin: 0%;
    font-size: 0.9rem;
    color: gray;
  }
`;

const HeaderIcons = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

const MessageContainer = styled.div``;

const EndMessages = styled.div``;

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userName = chat.users[1].split("@")[0];
  const [messagesSnapShot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapShot) {
      return messagesSnapShot.docs.map((message) => {
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />;
      });
    }
  };

  return (
    <Container>
      {/* <h2>Chat with {userName}</h2> */}
      <Header>
        <ChatAvatar></ChatAvatar>
        <HeaderInformation>
          <h4>Chat with {userName}</h4>
          <p>Last seen...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {/* show messages */}
        <EndMessages></EndMessages>
      </MessageContainer>
    </Container>
  );
};

export default ChatScreen;
