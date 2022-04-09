import { AttachFile, MoreVert, Send } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import firebase from "firebase/compat/app";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import TimeAgo from "timeago-react";
import { auth, db } from "../firebase";
import getEmail from "../utils/getEmail";
import Footer from "./Footer";
import Message from "./Message";
import DropDown from "./subComponents/DropDown";

const Container = styled.div`
  padding-left: 1rem;
  max-height: 100vh;
  overflow-y: hidden;
  @media only screen and (max-width: 840px) {
    padding: 0 0.4rem;
    padding-top: 4rem;
  }
`;

const Header = styled.div`
  position: sticky;
  z-index: 100;
  top: 0;
  padding: 1rem;

  height: 80px;
  display: flex;
  align-items: center;
`;

const HeaderInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
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
  background-color: rgba(169, 226, 255, 0.4);
  border-radius: 40px;
  z-index: 100;
  overflow-y: scroll;

  @media only screen and (max-width: 840px) {
    border-radius: 20px;
  }
`;

const EndMessages = styled.div`
  max-height: 65vh;
  /* margin-bottom: 100px; */

  @media only screen and (max-width: 840px) {
    margin-bottom: 20px;
  }
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 20px;
  position: sticky;
  bottom: 0;
  z-index: 100;

  @media only screen and (max-width: 396px) {
    padding: 10px 0;
  }

  @media (min-width: 396px) and (max-width: 840px) {
    padding: 10px 0;
  }
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  margin: 0 15px;
  position: sticky;
  bottom: 0;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 4px;

  @media only screen and (max-width: 396px) {
    max-width: 396px;
    padding: 10px;
    margin: 0;
  }

  @media (min-width: 396px) and (max-width: 840px) {
    padding: 10px;
    width: auto;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChatScreen = ({ chat, messages }) => {
  const [menu, setMenu] = useState(false);
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const endMessageRef = useRef(null);

  // Helper function for scrolling to bottom automatically
  const scrollToBottom = () => {
    if (endMessageRef.current) {
      endMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, [router.query.id]);

  // filtering out the the name of active user to get the name of the other user
  const filtered = Object.entries(chat.users).filter(
    ([key, value]) => value != user.email
  );
  const userName = filtered[0][1].split("@")[0];

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
        {menu && <DropDown></DropDown>}
        <HeaderIcons onClick={() => setMenu((prevState) => !prevState)}>
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
        <Button>
          <AttachFile></AttachFile>
        </Button>
        <Input
          placeholder="Say something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></Input>
        <Button disabled={!input} type="submit" onClick={sendMessage}>
          <Send></Send>
        </Button>
      </InputContainer>
      <FooterContainer>
        <Footer></Footer>
      </FooterContainer>
    </Container>
  );
};

export default ChatScreen;
