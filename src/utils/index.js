export function formatNumber(number) {
  return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function findAccount(number) {
  const users = JSON.parse(localStorage.getItem('users'));
  for (const user of users) {
    if (user.number === number) {
      return user;
    }
  }
  return false;
}

export function getDateToday() {
  const transDate = new Date();
  return `${transDate.toLocaleString('en-us', {
    month: 'long',
  })} ${transDate.getDay()}, ${transDate.getFullYear()}`;
}
