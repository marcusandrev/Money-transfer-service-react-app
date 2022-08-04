import { useState } from 'react';
import { Notif } from '../../components/notification';
import { formatNumber, getDateToday } from '../../utils';
import {
  TransferContainer,
  FormBody,
  FormHeading,
  FormLabel,
  FormInput,
  FormButton,
  FormSelect,
  Line,
} from './Transfer.styles';

export const Transfer = (props) => {
  const { isClient, client } = props;
  const [users, setUsers] = useState(props.users);
  const [receivers, setReceivers] = useState(users);
  const [sender, setSender] = useState(isClient ? client : { balance: 0 });
  const [receiver, setReceiver] = useState({ balance: 0 });
  const [notif, setNotif] = useState({
    message: '',
    style: '',
  });
  const [transferAmount, setTransferAmount] = useState(0);
  const [message, setMessage] = useState('');

  const senderSelected = (event) => {
    const accountNumber = event.target.value;

    let sender = null;

    users.forEach((user) => {
      if (user.number === accountNumber) {
        sender = user;
      }
    });

    // const newUsers = users.filter((user, index) => {
    //   return user.number !== accountNumber;
    // });

    setSender(sender);
    // setReceivers(newUsers);
    setReceiver({ number: 0, balance: 0 });
  };

  const receiverSelected = (event) => {
    const accountNumber = event.target.value;

    let receiver = null;

    users.forEach((user) => {
      if (user.number === accountNumber) {
        receiver = user;
      }
    });

    setReceiver(receiver);
  };

  let senders = null;
  // if (!isClient) {
  //   senders = users.map((user) => {
  //     return (
  //       <option value={user.number}>
  //         {user.fullname} #{user.number}gry
  //       </option>
  //     );
  //   });
  // }

  const newReceivers = receivers.map((receiver) => {
    if (sender.number !== receiver.number) {
      return (
        <option value={receiver.number}>
          {receiver.fullname} #{receiver.number}
        </option>
      );
    }
  });

  const transferFund = (event) => {
    event.preventDefault();
    const amount = parseFloat(
      event.target.elements.amount.value.replace(/,/g, '')
    );

    const messages = event.target.message.value;

    console.log(messages);

    if (amount <= 0) return false;

    // get localstorage users
    const users = JSON.parse(localStorage.getItem('users'));

    if (sender.number !== 0 && receiver.number !== 0 && receiver.number) {
      // deduct from sender
      let senderSuccess = false;
      users.forEach((user) => {
        if (user.number === sender.number) {
          if (user.balance - amount >= 0) {
            user.balance -= amount;

            // const transDate = new Date();
            console.log(user.transactions);
            user.transactions.unshift({
              title: `Fund transfer to ${receiver.fullname} #${receiver.number}`,
              amount: amount,
              type: 'debit',
              message: messages,
              date: getDateToday(),
            });

            setSender(user);
            senderSuccess = true;
          }
        }
      });

      // add to receiver
      if (senderSuccess) {
        users.forEach((user) => {
          if (user.number === receiver.number) {
            user.balance += amount;

            // adds the amount to the beginning of the transaction
            user.transactions.unshift({
              title: `Fund transfer from ${sender.fullname} #${receiver.number}`,
              amount: amount,
              type: 'credit',
              message: messages,
              date: getDateToday(),
            });

            setReceiver(user);
          }
        });

        setNotif({ message: 'Successful transfer.', style: 'success' });
        setUsers(users);
        props.setUsers(users);
        localStorage.setItem('users', JSON.stringify(users));
        setTransferAmount(0);
        setMessage('');
      } else {
        setNotif({ message: 'Transfer failed.', style: 'danger' });
      }
    } else {
      setNotif({
        message: 'Incomplete information. Missing sender or receiver.',
        style: 'danger',
      });
    }
  };

  const onTransfer = (e) => {
    const transfer = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setTransferAmount(transfer);
  };

  const onMessage = (e) => {
    const messages = e.target.value;
    setMessage(messages);
  };

  let senderField = (
    <FormSelect onChange={senderSelected} name='sender'>
      <option>Select Sender</option>
      {senders}
    </FormSelect>
  );

  if (isClient) {
    senderField = (
      <FormInput
        type='text'
        name='sender'
        value={`${client.fullname} #${client.number}`}
        disabled
      />
    );
  }
  return (
    <TransferContainer>
      <FormBody onSubmit={transferFund}>
        <Notif message={notif.message} style={notif.style} />
        <FormHeading>Sender</FormHeading>
        <FormLabel>From</FormLabel>

        {senderField}

        <FormLabel>Current balance</FormLabel>
        <FormInput type='text' value={formatNumber(sender.balance)} disabled />

        <FormLabel>Amount to Transfer</FormLabel>
        <FormInput
          type='text'
          name='amount'
          value={formatNumber(transferAmount)}
          onChange={onTransfer}
        />

        <FormLabel>Message</FormLabel>
        <FormInput
          type='text'
          name='message'
          value={message}
          onChange={onMessage}
        />

        <Line />

        <FormHeading>Receiver</FormHeading>
        <FormLabel>To</FormLabel>

        <FormSelect
          value={receiver.number || 0}
          onChange={receiverSelected}
          name='receiver'
        >
          <option>Select Receiver</option>
          {newReceivers}
        </FormSelect>

        <FormLabel>Current balance</FormLabel>
        <FormInput
          type='text'
          value={formatNumber(receiver.balance)}
          disabled
        />
        <FormButton type='submit' value='Transfer Fund' />
      </FormBody>
    </TransferContainer>
  );
};
