import React, {useState, useRef, useCallback, useMemo} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import DateFilter from './components/DateFilter';
import Header from './components/Header';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import TransactionSectionList from './components/TransactionSectionList';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from './app/store';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import IncomeExpense from './components/IncomeExpense';
import GridSelector from './components/GridSelector';

let persistor = persistStore(store);

export default App = () => {
  //state to know which list to rendered
  const [isSectionList, setIsSectionList] = useState(false);

  //
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(true);

  useState(() => {
    if (isMonthModalVisible || isYearModalVisible) {
      setIsIncomeModalVisible(false);
    }
  }, [isYearModalVisible, isMonthModalVisible, isIncomeModalVisible]);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '25%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const values = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const yearValues = ['2020', '2021', '2022'];

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaView style={Styles.container}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            <BottomSheetModalProvider>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'WorkSans-Regular',
                }}>
                08 Feb 2022
              </Text>
              <Header
                onPress={() => {
                  setIsMonthModalVisible(false);
                  setIsYearModalVisible(false);
                  if (!isIncomeModalVisible) {
                    setIsIncomeModalVisible(true);
                  }
                  handlePresentModalPress();
                }}
              />
              <DateFilter
                onListTypeChange={setIsSectionList}
                isSectionList={isSectionList}
                onMonthSelect={setIsMonthModalVisible}
                onYearSelect={setIsYearModalVisible}
                onIncomeComponentHide={setIsIncomeModalVisible}
                onPresentBottomSheetModal={handlePresentModalPress}
              />
              {isSectionList ? <TransactionSectionList /> : <TransactionList />}
              <AddTransaction />
              {/* Modal */}
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{backgroundColor: '#f2f2f2'}}>
                <View style={Styles.contentContainer}>
                  {/* Form */}

                  {isIncomeModalVisible && (
                    <IncomeExpense onClose={handleCloseModalPress} />
                  )}

                  {isYearModalVisible && (
                    <GridSelector
                      data={yearValues}
                      onSelectCloseModal={handleCloseModalPress}
                    />
                  )}

                  {isMonthModalVisible && (
                    <GridSelector
                      data={values}
                      onSelectCloseModal={handleCloseModalPress}
                    />
                  )}
                </View>
              </BottomSheetModal>
            </BottomSheetModalProvider>
          </SafeAreaView>
        </GestureHandlerRootView>
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
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
});
