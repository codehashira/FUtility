import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {nanoid} from '@reduxjs/toolkit';
import {
  transactionAdded,
  transactionEdited,
} from '../features/transactionsSlice';

import moment from 'moment';

const AddTransaction = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [buttonTitle, setButtonTitle] = useState('ADD');
  const [editFlash, setEditFlash] = useState(false);

  const editmode = useSelector(
    state => state.transactions.transactions[1].editmode,
  );

  useEffect(() => {
    console.log(editmode);
    if (editmode.enable) {
      setButtonTitle('DONE');
      //Micro Feedback on input
      //Set flash boolean value to true
      //that activates micro feedback
      setEditFlash(true);

      setAmount(editmode.transactionItem.amount.toString());
      setDescription(editmode.transactionItem.description);

      //disables MF after 300ms
      setTimeout(() => {
        setEditFlash(false);
      }, 500);
    } else {
      return;
    }
  }, [editmode]);

  const dispatch = useDispatch();

  const handleAdd = () => {
    //Normal Transaction Added
    if (!editmode.enable) {
      if (amount === '' || description === '') {
        ToastAndroid.show('Empty Input', ToastAndroid.SHORT);
        return;
      }

      dispatch(
        transactionAdded({
          id: nanoid(),
          description: description,
          amount: amount,
          date: moment().format('lll'),
        }),
      );

      setAmount('');
      setDescription('');
      ToastAndroid.show('Transaction Added', ToastAndroid.SHORT);
    } else {
      if (amount === '' || description === '') {
        ToastAndroid.show('Empty Input', ToastAndroid.SHORT);
        return;
      }
      // Edit Mode Transaction
      dispatch(
        transactionEdited({
          id: editmode.transactionItem.id,
          amount: amount,
          description: description,
          date: editmode.transactionItem.date,
        }),
      );
      setButtonTitle('ADD');
      setAmount('');
      setDescription('');
      ToastAndroid.show('Transaction Updated', ToastAndroid.SHORT);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        Styles.inputContainer,
        {
          borderColor: editmode.enable ? '#1c5a23' : 'rgba(205,205,205,0.5)',
          backgroundColor: editFlash ? 'rgba(28, 90, 35, 0.5)' : '#f2f2f2',
        },
      ]}>
      <TextInput
        value={description}
        placeholder="Description"
        onChangeText={text => setDescription(text)}
        style={{
          width: '40%',
          paddingLeft: 10,
          fontSize: 16,
          fontFamily: 'WorkSans-Regular',
        }}
      />

      <View style={{width: 1, height: 16, backgroundColor: '#cdcdcd'}}></View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '30%',
          fontFamily: 'WorkSans-Regular',
        }}>
        <Text>₹</Text>
        <TextInput
          value={amount}
          placeholder="0"
          onChangeText={text => setAmount(text)}
          keyboardType={'number-pad'}
          style={{width: '80%', fontFamily: 'WorkSans-Bold', fontSize: 18}}
        />
      </View>
      <TouchableOpacity
        style={Styles.addTransactionButton}
        activeOpacity={0.85}
        onPress={handleAdd}>
        <Text
          style={{
            color: 'white',
            letterSpacing: 2,
            fontSize: 14,
            textAlign: 'center',
            fontFamily: 'WorkSans-Bold',
          }}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addTransactionButton: {
    backgroundColor: '#1c5a23',
    paddingVertical: 18,
    paddingHorizontal: 15,
    width: '22%',
  },
});

export default AddTransaction;
