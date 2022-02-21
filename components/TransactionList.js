import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Transaction from './Transaction';
import * as Animatable from 'react-native-animatable';

const TransactionList = () => {
  const data = useSelector(state => state.transactions.transactions[0].data);
  const renderItem = ({item, index}) => (
    <Transaction item={item} index={index} />
  );

  return (
    <View style={Styles.transactionContainer}>
      {data ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <Animatable.Text
                animation={'flash'}
                easing="ease-out"
                iterationCount={1}
                delay={300}
                style={{color: '#000', fontFamily: 'WorkSans-Regular'}}>
                {' '}
                Empty! Try Adding Transactions.
              </Animatable.Text>
            </View>
          }
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  transactionContainer: {
    flex: 6,
    marginVertical: 10,
  },
});

export default TransactionList;
