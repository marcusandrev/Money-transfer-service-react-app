import React from 'react';
import { NavbarContainer, NavbarItems, NavbarItem } from './Navbar.styles';

//this is the skeleton
export const NavbarLinks = (props) => {
  const { user, logoutHandler, changePage, page } = props;

  //link is the navbar links
  let links = null;
  if (user) {
    links = (
      <PagesLink
        changePage={changePage}
        page={page}
        logoutHandler={logoutHandler}
      />
    );
  }

  return <NavbarContainer>{links}</NavbarContainer>;
};

// this is the link to pages
const PagesLink = (props) => {
  const { changePage, logoutHandler } = props;

  return (
    <NavbarItems>
      <NavLink
        onClickHandler={changePage}
        // active={page}
        page='home'
        text='Home'
      />
      <NavLink
        onClickHandler={changePage}
        // active={page}
        page='transfer'
        text='Transfer'
      />
      <NavLink onClickHandler={logoutHandler} text='Logout' />
    </NavbarItems>
  );
};

// this is the text
const NavLink = (props) => {
  const { text, page } = props;

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
      <NavbarItem onClick={clickLink} href='#'>
        {text}
      </NavbarItem>
    </li>
  );
};
