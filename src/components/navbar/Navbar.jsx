import React, {useState} from 'react';
import {NavbarLinks } from './NavbarLinks'
import { Home } from '../../pages/Home/Home';
import { Transfer } from '../../pages/Transfer/Transfer';
import { findAccount } from '../../utils';
import { Container, MainContainer } from './Navbar.styles';

// try to remove logout handler later

export const Navbar = (props) => {
    const { logout, client, setClient } = props;
    const [users, setUsers] = useState(props.users);
    const [ page, setPage ] = useState('home');

  
    const changePageHandler = (pageName) => {
      setPage(pageName);

      const currentUser = findAccount(client.number);
      setClient(currentUser);
    }
  
    if(page === 'home') {
      return (
        <Container>
        <MainContainer>
          <NavbarLinks changePage={changePageHandler} page={page} user={client} logoutHandler={logout} />
          <Home user={client} />
        </MainContainer>
        </Container>
      )
    }
  
  // This is the page which should be seen on Authenticate. If a component is removed,
  // page will not load
    if(page === 'transfer') {
      return (
        <Container>
        <MainContainer>
          <NavbarLinks changePage={changePageHandler} page={page} user={client} logoutHandler={logout} />
          <Transfer isClient="true" client={client} setClient={setClient} users={users} setUsers={setUsers}  />
        </MainContainer>
        </Container>
      )
    }


}