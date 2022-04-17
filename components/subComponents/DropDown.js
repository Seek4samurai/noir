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
    if (window.confirm("Do you really want to leave?")) {
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
    if (window.confirm("Do you really want to leave?")) {
      const userSnapShot = await db.collection("chats").doc(router.query.id);
      userSnapShot.delete();

      stateChanger(false); // hides the dropdown again after deleting
      router.push("/"); // deleting a chat should refresh the route
      console.log("User deleted");
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
