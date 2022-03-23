import firebase from "firebase/compat/app";
import { auth, db } from "../firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { InsertEmoticon, MoreVert } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import Message from "./Message";
import getEmail from "../utils/getEmail";
import TimeAgo from "timeago-react";

const Container = styled.div``;

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

const Heading = styled.h2`
  margin-left: 1rem;
  color: #303030;
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
  max-height: 65vh;
  background-color: #fcd4db;
  z-index: 100;
  overflow-y: scroll;
`;

const EndMessages = styled.div`
  max-height: 65vh;
  margin-bottom: 100px;
`;

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
  const endMessageRef = useRef(null);
  const userName = chat.users[1].split("@")[0];

  // collection's snapshots
  const [messagesSnapShot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getEmail(chat.users, user))
  );

  const showMessages = () => {
    if (messagesSnapShot) {
      return messagesSnapShot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  // Helper function for scrolling to bottom automatically
  const scrollToBottom = () => {
    endMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
    scrollToBottom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getEmail(chat.users, user);

  return (
    <Container>
      <Heading>NOIR</Heading>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL}></Avatar>
        ) : (
          <Avatar src={recipientEmail[0]}></Avatar>
        )}
        <HeaderInformation>
          <h4>{userName}</h4>
          {recipientSnapshot ? (
            <p>
              Last seen:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()}></TimeAgo>
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading last active...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndMessages ref={endMessageRef}></EndMessages>
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
