import firebase from "firebase/compat/app";
import { auth, db } from "../firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { InsertEmoticon, MoreVert } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import Message from "./Message";

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

const MessageContainer = styled.div`
  padding: 30px;
  min-height: 65vh;
  background-color: #e5ded8;
`;

const EndMessages = styled.div``;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 20px;
  position: sticky;
  bottom: 0;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin: 0 15px;
  position: sticky;
  bottom: 0;
  z-index: 100;
`;

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
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
    } else {
      return JSON.parse(messages).map((message) => {
        <Message
          key={message.id}
          user={message.user}
          message={message}
        ></Message>;
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // updating last seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
  };

  return (
    <Container>
      <h2>Chat with {userName}</h2>
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
        {/* {showMessages()} */}
        <EndMessages></EndMessages>
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon></InsertEmoticon>
        <Input value={input} onChange={(e) => setInput(e.target.value)}></Input>
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;
