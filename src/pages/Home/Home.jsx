import React from 'react';
import { AccountProfile } from './AccountProfile';
import { formatNumber } from '../../utils';
import { AccountContainer, TransactionHistoryTable, TransactionHistoryItem, HomeHeading } from './Home.styles';


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
      
      <AccountProfile
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
