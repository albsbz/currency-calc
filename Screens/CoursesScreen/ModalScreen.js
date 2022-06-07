import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState, useCallback } from 'react';

import { getFlagEmoji } from '../../helpers';
import axiosInstance from '../../api/axios';
import AppChart from '../../components/AppChart';

const ModalScreen = ({ navigation, route }) => {
  const [rates, setRates] = useState([]);
  const { cc, cnc, name, rate, symbol, txt, exchangedate } = route.params.currency;
  console.log('params', route.params.currency);
  const now = new Date();
  let end = now.toISOString().split('T')[0].split('-').join('');
  let start = new Date(now.setDate(now.getDate() - 356))
    .toISOString()
    .split('T')[0]
    .split('-')
    .join('');

  const prepareForChart = (datesFromApi) => {
    const data = datesFromApi.map((r) => {
      const [d, m, y] = r.exchangedate.split('.');
      return {
        timestamp: Date.UTC(y, m, d),
        value: r.rate,
      };
    });
    return data;
  };

  const getRates = useCallback(async () => {
    const { data } = await axiosInstance.get(
      `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${start}&end=${end}&valcode=${cc.toLowerCase()}&sort=exchangedate&order=desc&json`
    );
    setRates(data);
  });

  useEffect(() => {
    try {
      !rates?.length && getRates();
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: txt });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Text>
        Country: {getFlagEmoji(cnc)} {name}
      </Text>
      <Text>Currency: {txt}</Text>
      <Text>Sympol: {symbol}</Text>
      <Text>
        Course on {exchangedate}: {rate.toFixed(2)} hrn
      </Text>
      <Text>{rates.length && <AppChart data={prepareForChart(rates)} />}</Text>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({});
