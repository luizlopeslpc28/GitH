import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchComponent from './SearchComponent';

const App = () => {
  return (
    <View style={styles.container}>
      <SearchComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
});

export default App;
