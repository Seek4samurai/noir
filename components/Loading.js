import styled from "styled-components";
import Image from "next/image";
import Logo from "../public/Logo.png";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Loading = () => {
  return (
    <Center>
      <Image src={Logo} width="80" height="140" alt="Loading"></Image>
    </Center>
  );
};

export default Loading;
