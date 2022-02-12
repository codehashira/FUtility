import React, {useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';

import DateFilter from './components/DateFilter';
import Header from './components/Header';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import TransactionSectionList from './components/TransactionSectionList';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from './app/store';

let persistor = persistStore(store);

export default App = () => {
  const [filtered, setFiltered] = useState(false);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={Styles.container}>
          <StatusBar backgroundColor={'white'} barStyle="dark-content" />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'WorkSans-Regular',
            }}>
            08 Feb 2022
          </Text>
          <Header />
          <DateFilter onFilter={setFiltered} filterValue={filtered} />
          {filtered ? <TransactionSectionList /> : <TransactionList />}
          <AddTransaction />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
