import React from 'react';
import styled from 'styled-components';

export const NavbarContainer = styled.section`
  font-family: 'Fredoka';
  font-size: 1.5rem;
  background-color: #ffb966;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const NavbarItems = styled.ul`
  list-style: none;
  display: flex;
  padding: 0.8rem 0;
  gap: 2em;
`;

export const NavbarItem = styled.a`
  color: #fff;
`;

//this is the skeleton
export const NavbarLinks = (props) => {
  const { user, logoutHandler, changePage, page } = props;
  let menu = null;

  // regular user
  if (user) {
    menu = (
      <ClientMenu
        changePage={changePage}
        page={page}
        logoutHandler={logoutHandler}
      />
    );
  }

  return <NavbarContainer>{menu}</NavbarContainer>;
};

// this is the link to pages
export const ClientMenu = (props) => {
  const { changePage, logoutHandler, page } = props;

  return (
    <NavbarItems>
      <SideLink
        onClickHandler={changePage}
        active={page}
        page='home'
        text='Home'
      />
      <SideLink
        onClickHandler={changePage}
        active={page}
        page='transfer'
        text='Transfer'
      />
      <SideLink onClickHandler={logoutHandler} active={page} text='Logout' />
    </NavbarItems>
  );
};

// this is the text
export const SideLink = (props) => {
  const { icon, text, page, active } = props;

  function clickLink(event) {
    if (page) {
      event.preventDefault();
      props.onClickHandler(page);
    } else {
      event.preventDefault();
      props.onClickHandler();
    }
  }

  return (
    <li>
      <NavbarItem
        onClick={clickLink}
        className={active === page ? 'active' : ''}
        href='#'
      >
        <i className={icon}></i> {text}
      </NavbarItem>
    </li>
  );
};
