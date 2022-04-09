import styled from "styled-components";
import { Delete } from "@mui/icons-material";
import { db } from "../../firebase";
import { useRouter } from "next/router";

const List = styled.div`
  cursor: pointer;
  padding: 0.8rem;
  background-color: #d2efff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const DropDown = () => {
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
      console.log("Documents deleted");
    }
  };

  return (
    <div>
      <List onClick={deleteChat}>
        <Delete></Delete> Delete
      </List>
    </div>
  );
};

export default DropDown;
