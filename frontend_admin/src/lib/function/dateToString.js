export const dateToString = date => {
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  );
};

export const dateToStringWithTime = indate => {
  let date = indate.split('T');

  return (
    date[0] + ' / ' + date[1].split('.')[0]
    // date.getFullYear() +
    // '-' +
    // (date.getMonth() + 1).toString().padStart(2, '0') +
    // '-' +
    // date.getDate().toString().padStart(2, '0') +
    // ' / ' +
    // date.getHours().toString().padStart(2, '0') +
    // ':' +
    // date.getMinutes().toString().padStart(2, '0') +
    // ':' +
    // date.getSeconds().toString().padStart(2, '0')
  );
};

export const dateToStringJustTime = indate => {
  let date = indate.split('T');

  return date[1].split('.')[0];
};

export const getTimeInfo = indate => {
  let date = indate.split('T');
  let time = date[1].split('.')[0];
  return time.split(':')[0];
};
