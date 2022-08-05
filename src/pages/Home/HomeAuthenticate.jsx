// this is the Authentication part of the Home Page

import React, {useState} from 'react'
import DATA from '../../data'
import {LogIn} from '../Login/Login'
import { HomePage } from './HomePage'
import {Navigate} from 'react-router-dom'

export const HomeAuthenticate = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notif, setNotif] = useState({ message: '', style: '' }); 
    // const [isAdmin, setIsAdmin] = useState(false);
    const [client, setClient] = useState(null);
  
    const localUsers = localStorage.getItem('users');
    if (!localUsers) {
      localStorage.setItem('users', JSON.stringify(DATA));
    }
    const clients = JSON.parse(localStorage.getItem('users'));
  
    setClient(clients[0]);
    // const isLoginSuccess = (email, password) => {
    //   let isFound = false;
  
    //   clients.forEach((user) => {
    //     if (user.email === email && user.password === password) {
    //       setClient(user);
    //       isFound = true;
  
    //       setNotif('');
          
    //     }
    //   });
  
    //   if (!isFound)
    //     setNotif({ message: 'Wrong email and password.', style: 'danger' });
    //   return isFound;
    // };
  
    // const login = (username, password) => {
    //   if (isLoginSuccess(username, password)) {
    //     setIsLoggedIn(true);
    //     window.localStorage.setItem('isLoggedIn', true);
        
    //   }
    // };
  
    const logout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('client');
      window.localStorage.removeItem('isLoggedIn');
      setNotif({ message: 'You have logged out.', style: 'success' });
    };
  
    setIsLoggedIn(true);
    window.localStorage.setItem('isLoggedIn', true);
    if (isLoggedIn){localStorage.setItem('currentUser', JSON.stringify(client));};
   
    console.log(isLoggedIn);
  // setclient is the matched account
  // users is the array 
  // logout is to set setIsLoggedIn to false
    if (isLoggedIn) {
      return (
        <HomePage
          client={client}
          users={clients}
          setClient={setClient}
          logout={logout}
        />
      );
    } else {
      return <Navigate to='/sample' />;
    }
}
