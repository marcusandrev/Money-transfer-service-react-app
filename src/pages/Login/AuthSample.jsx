import React from 'react'
import DATA from '../../data';
import { LogIn } from './Login';

export const AuthSample = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notif, setNotif] = useState({ message: '', style: '' }); //NA
    // const [isAdmin, setIsAdmin] = useState(false);
    const [client, setClient] = useState(null);

    const localUsers = localStorage.getItem('users');
    if (!localUsers) {
      localStorage.setItem('users', JSON.stringify(DATA));
    }
    const clients = JSON.parse(localStorage.getItem('users'));
  
    const isLoginSuccess = (email, password) => {
      let isFound = false;
  
      clients.forEach((user) => {
        if (user.email === email && user.password === password) {
          setClient(user);
          isFound = true;
  
          setNotif('');
          
        }
      });
  
      if (!isFound)
        setNotif({ message: 'Wrong email and password.', style: 'danger' });
      return isFound;
    };
  
    const login = (username, password) => {
      if (isLoginSuccess(username, password)) {
        setIsLoggedIn(true);
        window.localStorage.setItem('isLoggedIn', true);
        
      }
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('client');
      window.localStorage.removeItem('isLoggedIn');
      setNotif({ message: 'You have logged out.', style: 'success' });
    };
  
  
    if (isLoggedIn){localStorage.setItem('currentUser', JSON.stringify(client));};

    if (isLoggedIn) {
        return (
          <Navbar
            client={client}
            users={clients}
            setClient={setClient}
            logout={logout}
          />
        );
      } else {
        return <LogIn loginHandler={login} notif={notif} isLoggedIn={isLoggedIn} />;
      }
}