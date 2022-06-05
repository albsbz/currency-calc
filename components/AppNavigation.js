import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AboutScreen from '../Screens/AboutScreen';
import CoursesScreen from '../Screens/CoursesScreen';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Screen
          name="CurrencyCourses"
          component={CoursesScreen}
          options={{
            tabBarLabel: 'Courses',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="currency-usd" color={color} size={size} />
            ),
            title: 'Currency courses',
          }}
          styles={styles.container}
        />
        <Screen
          name="AboutApplication"
          component={AboutScreen}
          options={{
            tabBarLabel: 'About',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="information" color={color} size={size} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});
