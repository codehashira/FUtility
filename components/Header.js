import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const Header = props => {
  const income = useSelector(
    state => state.transactions.transactions[0].income,
  );
  const expenses = useSelector(
    state => state.transactions.transactions[0].expenses,
  );

  return (
    <View style={Styles.headerContainer}>
      <View style={Styles.incomeContainer}>
        <Text
          style={{
            fontFamily: 'WorkSans-Regular',
            color: '#1e272e',
            fontSize: 16,
          }}>
          Income :{' '}
        </Text>
        <Text
          style={{
            fontFamily: 'WorkSans-Medium',
            color: '#05c46b',
            fontSize: 16,
          }}>
          ₹{income}
        </Text>
      </View>
      <View style={Styles.expensesContainer}>
        <Text
          style={{
            fontFamily: 'WorkSans-Regular',
            color: '#1e272e',
            fontSize: 16,
          }}>
          Expenses :{' '}
        </Text>
        <Text
          style={{
            fontFamily: 'WorkSans-Medium',
            color: '#ff3f34',
            fontSize: 16,
          }}>
          ₹ {expenses}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
          <Text>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  incomeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  expensesContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Header;
