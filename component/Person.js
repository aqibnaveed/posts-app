import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Person = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.email}>{props.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  email: {
    color: 'grey',
  },
});

export default Person;
