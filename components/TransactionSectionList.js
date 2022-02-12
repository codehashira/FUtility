import React from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Transaction from './Transaction';
import * as Animatable from 'react-native-animatable';

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
let yearlySortedTransaction = [];

const TransactionSectionList = () => {
  const yearlyTransactions = useSelector(
    state => state.transactions.transactions[0].data,
  );

  yearlyTransactions.forEach(item => {
    yearlySortedTransaction[month.indexOf(item.date.slice(7, 12).trim())] = {
      title: item.date.slice(7, 12).trim(),
      data: [],
    };
  });

  yearlyTransactions.forEach(item => {
    yearlySortedTransaction[
      month.indexOf(item.date.slice(7, 12).trim())
    ].data.push(item);
  });

  yearlySortedTransaction.shift();

  return yearlyTransactions ? (
    <SectionList
      sections={yearlySortedTransaction}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <Transaction item={item} />}
      renderSectionHeader={({section: {title, income, expense}}) => (
        <Animatable.View
          animation={'fadeIn'}
          duration={500}
          delay={100}
          easing={'ease-in-out'}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'WorkSans-Medium',
                fontSize: 16,
                color: 'black',
                marginVertical: 12,
              }}>
              {title}
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'WorkSans-Regular',
                  fontSize: 10,
                  marginRight: 10,
                }}>
                In : {0}
              </Text>
              <Text
                style={{
                  fontFamily: 'WorkSans-Regular',
                  fontSize: 10,
                }}>
                Ex : {0}
              </Text>
            </View>
          </View>
        </Animatable.View>
      )}
      ListEmptyComponent={
        <View>
          <Text>Empty! Try Adding Transactions.</Text>
        </View>
      }
    />
  ) : (
    <ActivityIndicator />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default TransactionSectionList;
