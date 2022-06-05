import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import axiosInstance from '../api/axios';

import AppSpinner from '../components/AppSpinner';
import CurrencyList from '../components/CurrencyList';
import * as countriesCurrencies from '../etc/countries-currency.json';
import AppSearch from '../components/AppSearch';

const CoursesScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const filterCourses = (c) =>
    c.filter(({ cc, txt }) => {
      return cc.includes(filterValue) || txt.includes(filterValue);
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
        <CurrencyList currencies={filterCourses(courses)} styles={styles.list} />
      )}
    </View>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'lightyellow' },
  list: {
    flex: 1,
    backgroundColor: 'red',
  },
});
