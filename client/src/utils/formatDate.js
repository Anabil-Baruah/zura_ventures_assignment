// dateFormatter.js

export function formatDate(inputDate) {
  const date = new Date(inputDate);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() % 100; 
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Format the date and time components
  const formattedDate = `${day} ${month} ${year} | ${hour}:${minute < 10 ? '0' : ''}${minute}`;

  return formattedDate;
}

export function formatArrayOfObjects(arrayOfObjects) {
  return arrayOfObjects.map(obj => ({
    ...obj,
    dateOfCreation: formatDate(obj.dateOfCreation),
  }));
}

