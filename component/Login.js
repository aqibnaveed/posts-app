import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TextInputBase} from 'react-native';

const Login = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={props.email}
        onChangeText={(text) => props.setEmail(text)}
        style={styles.input}
      />

      {props.emailError ? (
        <Text style={styles.error}>Invalid Email Address</Text>
      ) : (
        <View />
      )}

      {props.internalError ? (
        <Text style={styles.error}>Internal Error</Text>
      ) : (
        <View />
      )}

      <TextInput
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        value={props.password}
        onChangeText={(text) => props.setPassword(text)}
        style={styles.input}
      />
      {props.passwordError ? (
        <Text style={styles.error}>Password can't be empty</Text>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  input: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderColor: 'lightgrey',
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: 'lightgrey',
    shadowOffset: {width: 1, height: 1},
    elevation: 0.7,
    color: 'black',
    marginVertical: 4,
  },
  error: {
    color: 'red',
  },
});

export default Login;
