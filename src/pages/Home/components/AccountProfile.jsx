import React from 'react';
import { formatNumber } from '../../../utils';
import { AccountDetailsContainer, HomeHeading } from '../Home.styles';

export const AccountProfile = (props) => {
  const { balance, fullname } = props;

  return (
    <>
      <HomeHeading>Account Profile</HomeHeading>
      <AccountDetailsContainer>
        <AccountHolder fullname={fullname} />
        <AccountBalance balance={formatNumber(balance)} />
      </AccountDetailsContainer>
    </>
  );
};

const AccountHolder = (props) => {
  return <h3>{props.fullname}</h3>;
};

const AccountBalance = (props) => {
  const balance = props.balance;
  return <div>Balance: ₱{balance}</div>;
};
