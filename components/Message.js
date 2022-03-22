import styled from "styled-components";

const Container = styled.div``;

const Message = ({ user, message }) => {
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
};

export default Message;
