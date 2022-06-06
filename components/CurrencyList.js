import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import React from 'react';

import { getFlagEmoji } from '../helpers';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the home screen!</Text>
      <Button onPress={() => navigation.navigate('MyModal')} title="Open Modal" />
    </View>
  );
}

const CurrencyList = ({ currencies, navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('CurrencyModal', {
            currency: item,
          })
        }
      >
        <View style={styles.item}>
          <View style={styles.currencyInfo}>
            <Text style={styles.flag}>{item.cnc ? getFlagEmoji(item.cnc) : ''}</Text>
            <Text style={styles.currencyCode}>{item.cc}</Text>
            <Text style={styles.txt}>{item.txt}</Text>
          </View>
          <Text style={styles.rate}>{item.rate.toFixed(2)}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View styles={styles.container}>
      <FlatList
        data={currencies}
        renderItem={renderItem}
        keyExtractor={(i) => i.cc}
        style={styles.list}
      />
    </View>
  );
};

export default CurrencyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100',
  },
  list: {},
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currencyInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  flag: {
    marginRight: 5,
  },
  txt: {
    marginRight: 5,
  },
  currencyCode: {
    marginRight: 5,
  },
});
