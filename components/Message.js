import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Container = styled.div``;

const MessageElement = styled.p`
  position: relative;
  text-align: left;
  width: fit-content;
  min-width: 60px;
  margin: 10px;
  padding: 15px;
  padding-bottom: 26px;
  border-radius: 8px;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #fcbac5;
`;

const Reciever = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const Timestamp = styled.span`
  color: gray;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  font-size: 9px;
  text-align: right;
`;

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);
  // checking reciever or sender
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
};

export default Message;
