import React from 'react';
import { formatNumber } from '../../utils';
import { AccountDetailsContainer } from './Home.styles';

export const AccountProfile = (props) => {
  const { balance, fullname } = props;

  return (
    <AccountDetailsContainer>
      {/* <div className="details"> */}
      <AccountHolder fullname={fullname} />
      {/* <AccountType type={type} /> */}
      {/* <AccountNumber accountNumber={accountNumber} /> */}
      {/* {action} */}

      {/* </div> */}
      <AccountBalance balance={formatNumber(balance)} />
    </AccountDetailsContainer>
  );
};

const AccountHolder = (props) => {
  return <h3>{props.fullname}</h3>;
};

const AccountBalance = (props) => {
  const balance = props.balance;
  return <div>Balance: ₱{balance}</div>;
};
