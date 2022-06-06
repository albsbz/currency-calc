import { StyleSheet, Text, ScrollView, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import CoursesListScreen from './CoursesListScreen';
import ModalScreen from './ModalScreen';

const CoursesScreen = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="CoursesListScreen"
          component={CoursesListScreen}
          options={{ title: 'Currency courses' }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="CurrencyModal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default CoursesScreen;
