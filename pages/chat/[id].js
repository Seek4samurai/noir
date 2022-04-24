import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import getEmail from "../../utils/getEmail";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Chat = () => {
  const [chat, setChat] = useState();
  const [messages, setMessages] = useState();
  const [userName, setUserName] = useState();
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      const fetchData = async () => {
        const ref = db.collection("chats").doc(router.query.id);
        const messagesRes = await ref
          .collection("messages")
          .orderBy("timestamp", "asc")
          .get();

        const messages = messagesRes.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime(),
          }));

        const chatRes = await ref.get();
        const chat = {
          id: chatRes.id,
          ...chatRes.data(),
        };

        setChat(chat);
        setMessages(JSON.stringify(messages));
        setUserName(getEmail(chat.users, user).split("@"));
      };

      fetchData();
    }
  }, [router.query.id]);

  return (
    <Container>
      <Sidebar></Sidebar>
      <ChatContainer>
        {chat && messages ? (
          <ChatScreen chat={chat} messages={messages}></ChatScreen>
        ) : null}
      </ChatContainer>
    </Container>
  );
};

export default Chat;
