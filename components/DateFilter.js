import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useSelector} from 'react-redux';

const DateFilter = props => {
  const [monthChecked, setMonthChecked] = useState(false);
  const [yearChecked, setYearChecked] = useState(false);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const current_month = useSelector(
    state => state.transactions.transactions[0].currentMonth,
  );
  const current_year = useSelector(
    state => state.transactions.transactions[0].currentYear,
  );

  console.log(`${month} ${year}`);

  useEffect(() => {
    setMonth(current_month);
    setYear(current_year);
  }, [current_month, current_year]);

  return (
    <View style={Styles.datefilterContainer}>
      <View style={Styles.monthFilter}>
        <TouchableOpacity
          style={Styles.monthCheckBox}
          activeOpacity={0.8}
          onPress={() => {
            if (!yearChecked) {
              ToastAndroid.show('Year Should Be Checked!', ToastAndroid.SHORT);
              return;
            }
            props.onListTypeChange(monthChecked);
            setMonthChecked(!monthChecked);
          }}>
          {monthChecked && (
            <View
              style={{
                width: 14,
                height: 14,
                backgroundColor: '#2f4530',
                borderRadius: 2,
              }}></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.monthSelect}
          activeOpacity={0.6}
          onPress={() => {
            props.onIncomeComponentHide(false);
            props.onMonthSelect(true);
            props.onYearSelect(false);
            props.onPresentBottomSheetModal();
          }}>
          <Text style={{fontFamily: 'WorkSans-Medium'}}>{month}</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: 1, height: 16, backgroundColor: '#cdcdcd'}}></View>
      <View style={Styles.monthFilter}>
        <TouchableOpacity
          style={Styles.monthCheckBox}
          activeOpacity={0.8}
          onPress={() => {
            if (monthChecked) {
              ToastAndroid.show('Uncheck Month First!', ToastAndroid.SHORT);
              return;
            }
            setYearChecked(!yearChecked);
            props.onListTypeChange(!yearChecked);
          }}>
          {yearChecked && (
            <View
              style={{
                width: 14,
                height: 14,
                backgroundColor: '#2f4530',
                borderRadius: 2,
              }}></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.monthSelect}
          activeOpacity={0.6}
          onPress={() => {
            props.onIncomeComponentHide(false);
            props.onMonthSelect(false);
            props.onYearSelect(true);
            props.onPresentBottomSheetModal();
          }}>
          <Text style={{fontFamily: 'WorkSans-Medium'}}>{year}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  datefilterContainer: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#cdcdcd',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  monthFilter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  monthCheckBox: {
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

export default DateFilter;
