import { StyleSheet, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppSearch = ({ handler, value }) => {
  const [inputVisible, onChangeInputVisible] = useState(false);

  const onPressSearch = () => {
    onChangeInputVisible(!inputVisible);
    handler('');
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={onPressSearch}>
        <View>
          <MaterialCommunityIcons name="magnify" style={styles.searchIcon} />
        </View>
      </TouchableWithoutFeedback>
      {inputVisible && (
        <>
          <TextInput style={styles.input} onChangeText={handler} value={value} autoFocus />
        </>
      )}
    </>
  );
};

export default AppSearch;

const styles = StyleSheet.create({
  input: {
    position: 'absolute',
    fontSize: 12,
    minWidth: '100%',
    top: 50,
    right: 5,
    backgroundColor: '#fff',
    borderColor: '#e91e63',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  searchIcon: {
    fontSize: 25,
    color: '#e91e63',
  },
});
