import styled from "styled-components";
import { Wave } from 'better-react-spinkit';

const Center = styled.div``;

const Loading = () => {
    return (
        <Center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
                    alt=""
                    height={100}
                    style={{ marginBottom: 10 }}
                ></img>
                <Wave size={40}></Wave>
            </div>
        </Center>
    )
};

export default Loading;