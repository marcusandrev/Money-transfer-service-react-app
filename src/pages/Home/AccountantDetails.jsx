import React from 'react';
import { formatNumber } from '../../utils';
import styled from 'styled-components';

export const AccountDetailsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  padding: 0.25rem;
  border-radius: 0.3rem;
  margin-bottom: 2rem;
`;

export const AccountantDetails = (props) => {
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

export const AccountHolder = (props) => {
  return <h3>{props.fullname}</h3>;
};

export const AccountBalance = (props) => {
  const balance = props.balance;
  return <div>Balance: {balance}</div>;
};
