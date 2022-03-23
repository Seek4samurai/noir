import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getEmail from "../utils/getEmail";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  word-break: break-word;
  padding: 0 1rem;
  cursor: pointer;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserImage = styled(Avatar)`
  margin: 5px;
  transform: scale(1.2);
`;

const UserChat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserImage src={recipient?.photoURL}></UserImage>
      ) : (
        <UserImage>{recipientEmail[0]}</UserImage>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
};

export default UserChat;
