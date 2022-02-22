import React, {useState} from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {useDispatch} from 'react-redux';
import {incomeUpdated} from '../features/transactionsSlice';

const IncomeExpense = props => {
  const dispatch = useDispatch();

  const [newIncome, setNewIncome] = useState();
  const [replace, setReplace] = useState(false);

  const handleIncomeSave = () => {
    if (newIncome === NaN || newIncome === undefined || newIncome === '')
      return;
    dispatch(
      incomeUpdated({
        replace: replace,
        income: newIncome,
      }),
    );
  };

  return (
    <View style={Styles.formContainer}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={props.onClose}>
          <Text style={{fontSize: 18}}> x </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleIncomeSave();
            props.onClose();
          }}>
          <Text
            style={{
              fontFamily: 'WorkSans-Bold',
              fontSize: 16,
              color: '#1c5a23',
              letterSpacing: 1,
            }}>
            {' '}
            OK
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
          <TouchableOpacity
            style={Styles.checkBox}
            activeOpacity={0.8}
            onPress={() => {
              setReplace(!replace);
            }}>
            {replace && (
              <View
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: '#2f4530',
                  borderRadius: 2,
                }}></View>
            )}
          </TouchableOpacity>
          <Text>Add To Existing Income</Text>
        </View>
        <BottomSheetTextInput
          value={newIncome}
          style={Styles.incomeTextInput}
          placeholder={'New Income'}
          placeholderTextColor={'gray'}
          onChangeText={text => setNewIncome(text)}
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  formContainer: {
    padding: 5,
  },
  incomeTextInput: {
    marginTop: 8,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 25,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  checkBox: {
    width: 20,
    height: 20,
    backgroundColor: '#c4c4c4',
    borderRadius: 2,
    marginRight: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IncomeExpense;
