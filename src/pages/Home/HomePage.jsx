// separated NavBar for each Page
// Home contains now the logic while this component contains the structure

import React, {useState} from 'react'
import {NavbarLinks} from '../../components/navbar/NavbarLinks'
import {Home} from './Home'
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

export const MainContainer = styled.div``

export const HomePage = (props) => {
    const { logout, client, setClient } = props;
    const [users, setUsers] = useState(props.users);
    const [ page, setPage ] = useState('home');

    const changePageHandler = (pageName) => {
        setPage(pageName);
  
        const currentUser = findAccount(client.number);
        setClient(currentUser);
      }

  return (
    <Container>
    <MainContainer>
      <NavbarLinks changePage={changePageHandler} page={'home'} user={client} logoutHandler={logout} />
      <Home user={client} />
    </MainContainer>
    </Container>
  )
}
