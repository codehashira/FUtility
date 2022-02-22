import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const GridItem = props => {
  console.log(`${props.title} -> ${props.currentMonth === props.title}`);

  return (
    <TouchableOpacity
      key={props.index}
      style={[
        Styles.gridItem,
        props.currentValue === props.title && {backgroundColor: '#1c5a23'},
      ]}
      onPress={() => {
        props.onPress('');
        props.onPress(props.title);
        props.onSelect();
      }}
      activeOpacity={0.7}>
      <Text
        style={[
          {fontFamily: 'WorkSans-Medium', color: 'black'},
          props.currentValue === props.title && {color: 'white'},
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const GridSelector = props => {
  //get current month and highlight it

  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View style={Styles.gridItemsContainer}>
      {props.data.map((item, index) => (
        <GridItem
          index={index}
          title={item}
          currentValue={selectedValue}
          onPress={setSelectedValue}
          onSelect={props.onSelectCloseModal}
        />
      ))}
    </View>
  );
};

const Styles = StyleSheet.create({
  gridItemsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingVertical: 10,
  },
  gridItem: {
    height: 40,
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default GridSelector;
