import React, {useState} from 'react';
import {NavbarLinks } from './NavbarLinks'
import { Home } from '../../pages/Home/Home';
import { Transfer } from '../../pages/Transfer/Transfer';
import { findAccount } from '../../utils';
import styled from 'styled-components';

export const Container = styled.div`
box-sizing: border-box;
padding: 2em;
margin: 4em auto 4em;
max-width: 48.75em;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
border-radius: 5px;
height: 100%;
`

export const MainContainer = styled.div`
`

export const Navbar = (props) => {
    const { logout, client, setClient } = props;
    const [users, setUsers] = useState(props.users);
    const [ page, setPage ] = useState('home');

  
    const changePageHandler = (pageName) => {
      setPage(pageName);

      //this is for the transaction history
      const currentUser = findAccount(client.number);
      setClient(currentUser);
    }
  
    if(page === 'home') {
      
      return (
        <Container>
        <MainContainer>
          <NavbarLinks changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
          <Home user={client} />
        </MainContainer>
        </Container>
      )
    }
  
  
    if(page === 'transfer') {
      return (
        <Container>
        <MainContainer>
          <NavbarLinks changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
          <Transfer isClient="true" client={client} setClient={setClient} users={users} setUsers={setUsers}  />
        </MainContainer>
        </Container>
      )
    }


}