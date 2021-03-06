import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../component/Login';

const LoginScreen = (props) => {
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [internalError, setInternalError] = useState(false);

  const validateEmail = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('email', re.test(emailText));
    return re.test(emailText.trim());
  };

  const validatePassword = () => {
    return passwordText.length > 0 ? true : false;
  };

  const onLogin = () => {
    const emailStatus = validateEmail();
    const passwordStatus = validatePassword();
    if (emailStatus) {
      console.log('valid email');

      if (emailError) {
        setEmailError(false);
      }
    } else {
      console.log('invalid email');
      setEmailError(true);
    }

    if (passwordStatus) {
      console.log('valid password');

      if (passwordError) {
        setPasswordError(false);
      }
    } else {
      console.log('invalid password');
      setPasswordError(true);
    }

    if (emailStatus && passwordStatus) {
      console.log('valid login details');
      validateLogin();
    } else {
      console.log('invalid details');
    }
  };

  const loginUser = async (res) => {
    setEmailText('');
    setPasswordText('');
    console.log('Login Successful!');
    console.log(res);

    try {
      await AsyncStorage.setItem('token', res.accessToken);
    } catch (err) {
      console.log('error in async', err);
    }

    console.log('TOKEN: ', res.accessToken);

    props.navigation.navigate('Dashboard', {
      user: res,
    });
  };

  const validateLogin = async () => {
    console.log('login: ', emailText, passwordText);
    try {
      fetch(`http://172.16.8.3:5000/login`, {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //   Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
          email: emailText,
          password: passwordText,
        }),
      })
        .then((res) => res.json())
        .then((res) => loginUser(res));

      if (internalError) {
        setInternalError(false);
      }

      console.log('USER LOGIN');

      //   console.log((await response).status);
      //   //  console.log('Status Code: ', (await response).status);
      //   if ((await response).status === 200) {
      //     console.log((await response).json());
      //     setEmailText('');
      //     setPasswordText('');
      //     console.log('Login Successful!');
      //     console.log('Email Id: (Login) ', emailText);
      //     props.navigation.navigate('Dashboard', {
      //       user: emailText,
      //     });
      //   } else {
      //     setInternalError(true);
      //     console.log('User not found');
      //   }
    } catch (e) {
      console.log('err:', e);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Login
            email={emailText}
            setEmail={setEmailText}
            password={passwordText}
            setPassword={setPasswordText}
            emailError={emailError}
            passwordError={passwordError}
            internalError={internalError}
          />
          <Button
            title="Login"
            color="#393a3b"
            onPress={() => {
              onLogin();
            }}
          />

          <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: 16,
                color: '#393a3b',
              }}
              onPress={() => {
                // setLogin(false);
                setEmailText('');
                setPasswordText('');
                props.navigation.navigate('SignUp', {
                  // navigation: navigation,
                });
              }}>
              Sign Up
            </Text>
            <Text
              style={{
                fontStyle: 'italic',
                fontSize: 16,
                color: '#393a3b',
              }}>
              {' '}
              instead
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default LoginScreen;
