import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';

const AppChart = ({ data }) => {
  return (
    <LineChart.Provider data={data} styles={styles.container}>
      <LineChart>
        <LineChart.Path />
        <LineChart.CursorCrosshair>
          <LineChart.Tooltip />
          <LineChart.Tooltip position="bottom">
            <LineChart.DatetimeText />
          </LineChart.Tooltip>
        </LineChart.CursorCrosshair>
      </LineChart>
    </LineChart.Provider>
  );
};

export default AppChart;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
