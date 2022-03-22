import styled from "styled-components";

const Container = styled.div``;

const Message = ({ user, message }) => {
  // console.log("logging here");
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
};

export default Message;
