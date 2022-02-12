trans = [
  {
    id: 0,
    amount: 599,
    description: 'laptop',
    date: new Date().toUTCString(),
  },
  {
    id: 1,
    amount: 599,
    description: 'laptop',
    date: 'Fri, 11 Mar 2022 17:10:05 GMT',
  },
];

let new2DArray = [];

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

trans.forEach(item => {
  new2DArray[month.indexOf(item.date.slice(7, 12).trim())] = {
    title: item.date.slice(7, 12).trim(),
    data: [],
  };
});

trans.forEach(item => {
  new2DArray[month.indexOf(item.date.slice(7, 12).trim())].data.push(item);
});

new2DArray.shift();
console.log(new2DArray);
// trans.sort((a, b) => a.month - b.month || a.year - b.year);
// console.log(trans);
