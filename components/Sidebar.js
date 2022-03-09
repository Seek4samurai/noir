import { Avatar, Button, IconButton } from '@material-ui/core';
import { AddCircleOutline, Chat, MoreVert, Receipt, Search } from '@material-ui/icons';
import * as EmailValidator from 'email-validator';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('Enter an Email address: ');
        if (!input) return null;
        if (EmailValidator.validate(input) && !chatExist(input) && input !== user.email) {
            db.collection("chats").add({
                users: [user.email, input],
            })
        }
    }

    // checking if chat already exists or not
    const chatExist = (recipientEmail) =>
        !!chatSnapshot?.docs.find(
            (chat) => chat.data().users.find(
                (user) => user === recipientEmail
            )?.length > 0
        );

    return <Container>
        <Header>
            <UserAvatar onClick={() => { auth.signOut() }}></UserAvatar>
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
