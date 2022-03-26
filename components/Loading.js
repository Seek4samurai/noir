import styled from "styled-components";
import { Wave } from "better-react-spinkit";
import Image from "next/image";
import Logo from "../public/Logo.png";

const Center = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: white;
`;

const Loading = () => {
  return (
    <Center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "140px",
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <Image src={Logo} alt="Loading" layout="fill"></Image>
        </div>
        <Wave size={40}></Wave>
      </div>
    </Center>
  );
};

export default Loading;
