import React from 'react';
import { AccountantDetails } from './AccountantDetails';
import { formatNumber } from '../../utils';
import styled from 'styled-components';

export const AccountContainer = styled.section`
  padding: 2rem;
`;

export const TransactionHistoryTable = styled.table`
  border-radius: 0.3rem;
  border-collapse: collapse;
  table-layout: auto;
  width: 100%;
  padding-bottom: 1rem;
  font-weight: normal;
`;

export const TransactionHistoryItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3fr 1fr 2fr;
  padding: 0.8rem;
  place-items: center;
  text-align: center;
  gap: 8px;
  &.even {
    background-color: rgba(238, 238, 238, 0.5);
  }
`;

export const HomeHeading = styled.h1`
font-family: 'Fredoka';
font-size: 1.5rem;
font-weight: bold;
color: #ffb966;
margin-bottom: 10px;
`

export const Home = (props) => {
  const { user } = props;
  // console.log(user);

  // this is for transaction history
  const transactions = user.transactions.map((transaction, index) => {
    const className = index % 2 === 0 ? 'even' : 'odd';
    return (
      <TransactionHistoryItem className={`${className}`}>
        <div>{transaction.date}</div>
        <div>{transaction.title}</div>
        <div>
          {transaction.type === 'debit'
            ? formatNumber(transaction.amount * -1)
            : formatNumber(transaction.amount)}
        </div>
        <div>{transaction.message}</div>
      </TransactionHistoryItem>
    );
  });

  return (
    <AccountContainer>
      <HomeHeading>Account Profile</HomeHeading>
      
      <AccountantDetails
        accountNumber={user.number}
        balance={user.balance}
        fullname={user.fullname}
      />
      <hr />
      <TransactionHistoryTable>
        <HomeHeading>Transactions</HomeHeading>

        {transactions}
      </TransactionHistoryTable>
    </AccountContainer>
  );
};
