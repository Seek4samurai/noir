import { Avatar, Button } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
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

  border-radius: 40px 40px 0px 0px;

  padding: 0 1rem;
  height: 130px;
  min-width: 180px;
  margin-left: 1rem;

  color: #414242;
  word-break: break-word;
  cursor: pointer;
  transition: all 0.4s;

  @media only screen and (max-width: 840px) {
    justify-content: end;
    height: 100px;
    min-width: 130px;
    width: 150px;
    padding: 0 0.4rem;
    margin-left: 0.2rem;
    border-radius: 30px 30px 0px 0px;
    p {
      font-size: 0.8rem;
    }
  }

  :hover {
    background: #d3eeff;
  }
`;

const EditUser = styled.span`
  display: flex;
  padding-left: 3rem;
  cursor: pointer;
  z-index: 99;
  @media only screen and (max-width: 840px) {
    font-size: 1rem;
    padding-left: 2rem;
    transform: translateY(20px);
  }
  :hover {
    ::after {
      content: "Edit";
      display: flex;
      align-items: center;
    }
  }
`;
const UserImage = styled(Avatar)`
  transform: scale(1.2);

  @media only screen and (max-width: 840px) {
    transform: scale(1);
  }
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

  // Changing names of users
  const changeName = async () => {
    const existCondition = await db
      .collection("chats")
      .doc(`${id}`)
      .collection("nickName")
      .where("user", "==", user.displayName)
      .get(); // Checking if nickname already exists?

    if (existCondition?.empty == true) {
      const newName = prompt("Enter Name: ");
      if (!newName) return null;

      db.collection("chats").doc(`${id}`).collection("nickName").add({
        user: user.displayName,
        Name: newName,
      });
    } else {
      // TODO : Add overwrite feature here!
      alert("Nick Name already exists!");
    }
  };

  // Changing friend's name from email to Nickname
  // Fetching nick name from firebase
  const [nickNameSnapShot] = useCollection(
    db
      .collection("chats")
      .doc(`${id}`)
      .collection("nickName")
      .where("user", "==", user.displayName)
  );

  const nickName = nickNameSnapShot?.docs?.[0]?.data().Name;

  return (
    <Container>
      <EditUser>
        <Button onClick={changeName}>
          <RateReviewIcon fontSize="large"></RateReviewIcon>
        </Button>
      </EditUser>
      {recipient ? (
        <UserImage src={recipient?.photoURL} onClick={enterChat}></UserImage>
      ) : (
        <UserImage onClick={enterChat}>{recipientEmail[0]}</UserImage>
      )}
      <p onClick={enterChat}>{nickName ? nickName : recipientEmail}</p>
    </Container>
  );
};

export default UserChat;
