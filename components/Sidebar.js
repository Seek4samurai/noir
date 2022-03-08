import { Avatar, Button, IconButton } from '@material-ui/core';
import { AddCircleOutline, Chat, MoreVert, Search } from '@material-ui/icons';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator';

const Sidebar = () => {
    const createChat = () => {
        const input = prompt('Enter an Email address: ');
        if (!input) return null;
        if (EmailValidator.validate(input)) {
            // push chats here
        }
    }
    return <Container>
        <Header>
            <UserAvatar></UserAvatar>
            <IconContainer>
                <IconButton>
                    <Chat></Chat>
                </IconButton>
                <IconButton>
                    <MoreVert></MoreVert>
                </IconButton>
            </IconContainer>
        </Header>
        <Footer>
            <SearchContainer>
                <Search></Search>
                <SearchInput placeholder='Search in chats'></SearchInput>
            </SearchContainer>
            <SidebarButton onClick={createChat}>
                <AddCircleOutline fontSize='large'></AddCircleOutline>
            </SidebarButton>

            {/* List of chats to be placed here */}

        </Footer>
    </Container>;
};

export default Sidebar;

// Styles here
const Container = styled.div`

`;
const Header = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 10px;
    height: 80px;
    border-bottom: 3px solid whitesmoke;
    z-index: 1;
`;
const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`;
const IconContainer = styled.div`

`;

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
`;
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;
const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline-width: 0px;
`;
const SidebarButton = styled(Button)`
    min-width: 0;
`;
