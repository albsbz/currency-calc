import { StyleSheet, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

import AppSpinner from '../components/AppSpinner';

const CoursesScreen = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axiosInstance.get('/exchange?json').then((response) => {
      setCourses(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <ScrollView>
      <Text>
        CoursesScreen
        {!courses?.length && <AppSpinner />}
      </Text>
    </ScrollView>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({});
