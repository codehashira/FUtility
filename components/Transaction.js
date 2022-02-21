import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  transactionEditModeOn,
  transactionDeleted,
} from '../features/transactionsSlice';

import * as Animatable from 'react-native-animatable';

const Transaction = props => {
  console.log(props.index);
  const [pressCount, setPressCount] = useState(1);
  const dispatch = useDispatch();

  const isEditModeOn = useSelector(
    state => state.transactions.transactions[1].editmode.enable,
  );

  return (
    <Animatable.View
      animation={'fadeIn'}
      duration={500}
      easing={'ease-in-out'}
      delay={parseInt(props.index) * 100}>
      <TouchableOpacity
        style={Styles.transactionContainer}
        onPress={() => {
          // Delete Transaction when transaction is tapped for 3 times
          if (pressCount === 3) {
            //prevent deleting while edit mode is on
            if (isEditModeOn) {
              ToastAndroid.show(
                'Cannot delete in edit mode',
                ToastAndroid.SHORT,
              );
              return;
            }
            dispatch(transactionDeleted({id: props.item.id}));
            ToastAndroid.show('Transaction Deleted', ToastAndroid.LONG);
            setPressCount(1);
          } else {
            setTimeout(() => {
              setPressCount(1);
              console.log('Reset');
            }, 2000);
            setPressCount(pressCount + 1);
          }
        }}
        onLongPress={() => {
          dispatch(transactionEditModeOn({id: props.item.id}));
        }}
        activeOpacity={0.7}>
        <View style={Styles.transactionDescription}>
          <Text style={{fontFamily: 'WorkSans-Medium', fontSize: 16}}>
            {props.item.description}
          </Text>
          <Text style={{fontFamily: 'WorkSans-Regular', fontSize: 10}}>
            {props.item.date}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'WorkSans-Medium',
            color: '#ff3f34',
            fontSize: 16,
          }}>
          ₹ {props.item.amount}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Styles = StyleSheet.create({
  transactionContainer: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDescription: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default Transaction;
