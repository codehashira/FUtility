import {createSlice} from '@reduxjs/toolkit';

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const d = new Date();

const intialState = {
  transactions: [
    {
      objectName: 'transaction_list',
      id: 'transaction_list',
      income: 29800,
      expenses: 0,
      currentMonth: month[d.getMonth()],
      currentYear: d.getFullYear(),
      data: [],
    },
    {
      objectName: 'other_parameters',
      id: 'other_parameters',
      editmode: {
        enable: false,
        transactionItem: undefined,
      },
    },
  ],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: intialState,
  reducers: {
    transactionAdded(state, action) {
      state.transactions[0].data.push(action.payload);
      state.transactions[0].income -= parseInt(action.payload.amount);
      state.transactions[0].expenses =
        parseInt(state.transactions[0].expenses) +
        parseInt(action.payload.amount);
    },
    transactionEditModeOn(state, action) {
      const {id} = action.payload;
      state.transactions[1].editmode.enable = true;
      state.transactions[1].editmode.transactionItem =
        state.transactions[0].data.find(item => item.id === id);
    },
    transactionEdited(state, action) {
      const {id, description, amount} = action.payload;
      const existingItem = state.transactions[0].data.find(
        item => item.id === id,
      );
      const difference = parseInt(amount) - parseInt(existingItem.amount);
      if (difference > 0) {
        state.transactions[0].income -= difference;
        state.transactions[0].expenses += difference;
      } else {
        state.transactions[0].income += Math.abs(difference);
        state.transactions[0].expenses -= Math.abs(difference);
      }

      existingItem.amount = amount;
      existingItem.description = description;
      state.transactions[1].editmode.enable = false;
      state.transactions[1].editmode.transactionItem = undefined;
    },
    transactionDeleted(state, action) {
      const {id} = action.payload;
      const existingItem = state.transactions[0].data.find(
        item => item.id === id,
      );
      state.transactions[0].income += Math.abs(existingItem.amount);
      state.transactions[0].expenses -= Math.abs(existingItem.amount);
      const newTransactions = state.transactions[0].data.filter(
        item => item.id !== id,
      );
      state.transactions[0].data = newTransactions;
    },
    incomeUpdated(state, action) {
      const {replace, income} = action.payload;
      if (!replace) {
        state.transactions[0].income = parseInt(income);
      } else {
        state.transactions[0].income += parseInt(income);
      }
      console.log(state.transactions[0].income);
    },
  },
});

export const {
  transactionAdded,
  transactionEditModeOn,
  transactionEdited,
  transactionDeleted,
  incomeUpdated,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
