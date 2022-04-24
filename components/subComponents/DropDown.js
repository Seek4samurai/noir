import styled from "styled-components";
import { Delete, GroupRemove } from "@mui/icons-material";
import { db } from "../../firebase";
import { useRouter } from "next/router";

const Container = styled.div`
  position: relative;
  top: 2rem;

  background-color: #eef7ff;
  border-radius: 10px;
`;

// make this responsive
const List = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 150px;
  padding: 0.8rem;
  margin: 0.2rem;

  background-color: #d2efff;
  border-radius: 10px;
`;

const DropDown = ({ stateChanger }) => {
  const router = useRouter();

  const deleteChat = async () => {
    if (window.confirm("Delete this chat from your DM?")) {
      const chatSnapShot = await db
        .collection("chats")
        .doc(router.query.id)
        .collection("messages")
        .get();

      const deletePromises = chatSnapShot.docs.map((d) => d.ref.delete());
      await Promise.all(deletePromises);

      stateChanger(false); // hides the dropdown again after deleting
      console.log("Documents deleted");
    }
  };

  const deleteUser = async () => {
    if (window.confirm("Delete this user from your DM?")) {
      // deleting messages data of user once the whole user is deleted
      const chatSnapShot = await db
        .collection("chats")
        .doc(router.query.id)
        .collection("messages")
        .get();

      const deletePromises = chatSnapShot.docs.map((d) => d.ref.delete());
      await Promise.all(deletePromises);

      // deleting saved nick names of user once the whole user is deleted
      const nickNameSnapShot = await db
        .collection("chats")
        .doc(router.query.id)
        .collection("nickName")
        .get();

      const deleteNamePromises = nickNameSnapShot.docs.map((d) =>
        d.ref.delete()
      );
      await Promise.all(deleteNamePromises);

      // Now deleting the user's chat with Current User
      const userSnapShot = await db.collection("chats").doc(router.query.id);
      userSnapShot.delete();

      stateChanger(false); // hides the dropdown again after deleting
      router.push("/"); // deleting a chat should refresh the route
    }
  };

  return (
    <Container>
      <List onClick={deleteChat}>
        <Delete></Delete>
        Delete Chat
      </List>
      <List onClick={deleteUser}>
        <GroupRemove></GroupRemove>
        Delete User
      </List>
    </Container>
  );
};

export default DropDown;
