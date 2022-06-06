import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import axiosInstance from '../../api/axios';

import AppSpinner from '../../components/AppSpinner';
import CurrencyList from '../../components/CurrencyList';
import * as countriesCurrencies from '../../etc/countries-currency.json';
import AppSearch from '../../components/AppSearch';

const CoursesListScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const filterCourses = (c) =>
    c.filter(({ cc, txt }) => {
      return cc.includes(filterValue.toUpperCase()) || txt.includes(filterValue);
    });

  const changeSearchHandler = (v) => {
    setFilterValue(v);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AppSearch handler={changeSearchHandler} value={filterValue} />,
    });
  }, [filterValue]);

  const updateCoursesWithCountries = (data) => {
    return data.map((i) => {
      if (!countriesCurrencies[i.cc]) return i;
      const { cnc, name, symbol } = countriesCurrencies[i.cc];
      return { ...i, cnc, name, symbol };
    });
  };

  const getCourses = useCallback(async () => {
    const { data } = await axiosInstance.get(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
    );
    setCourses(updateCoursesWithCountries(data));
  });

  useEffect(() => {
    try {
      !courses?.length && getCourses();
    } catch (error) {
      console.log('error', error);
    }
  }, [getCourses]);
  return (
    <View styles={styles.container}>
      {!courses?.length ? (
        <AppSpinner />
      ) : (
        <CurrencyList
          currencies={filterCourses(courses)}
          styles={styles.list}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default CoursesListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'lightyellow' },
  list: {
    flex: 1,
    backgroundColor: 'red',
  },
});
