import styled from "styled-components";
import { Delete } from "@material-ui/icons";

const List = styled.div`
  width: 200px;
  height: 90px;
  padding: 2rem;
  background-color: #d2efff;
`;

const DropDown = () => {
  return (
    <div>
      <List>
        <li>
          <Delete></Delete> Delete Chat
        </li>
      </List>
    </div>
  );
};

export default DropDown;
