import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';

const SignUpScreen = (props) => {
  const [fnameText, setFnameText] = useState('');
  const [lnameText, setLnameText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [internalError, setInternalError] = useState(false);

  const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('email', re.test(email));
    return re.test(email.trim());
  };

  const validateName = (name) => {
    let re = /^[a-zA-Z]{2,20}$/;
    return re.test(name.trim());
  };

  const validatePassword = (password) => {
    console.log('validate password method');
    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const test = re.test(password);
    console.log('password', test);
    return re.test(password);
  };

  const onSignUp = () => {
    if (validateName(fnameText)) {
      console.log('valid First name');
      if (fnameError) {
        setFnameError(false);
      }
    } else {
      console.log('invalid First name');
      setFnameError(true);
    }

    if (validateName(lnameText)) {
      console.log('valid Last name');
      if (lnameError) {
        setLnameError(false);
      }
    } else {
      console.log('invalid Last name');
      setLnameError(true);
    }

    if (validateEmail(emailText)) {
      console.log('valid email');
      if (emailError) {
        setEmailError(false);
      }
    } else {
      console.log('invalid email');
      setEmailError(true);
    }

    if (validatePassword(passwordText)) {
      console.log('valid password');
      if (passwordError) {
        setPasswordError(false);
      }
    } else {
      console.log('invalid password');
      setPasswordError(true);
    }

    // if (duplicateEmail) {
    //   setDuplicateEmail(false);
    // }

    if (!fnameError && !lnameError && !emailError && !passwordError) {
      console.log('Call "Add User" here');
      addUser();
    }

    console.log(fnameText, lnameText, emailText, passwordText);
  };

  const addUser = async () => {
    console.log('addUser START:');
    try {
      const response = await fetch('http://172.16.8.3:5000/sign-up', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: fnameText,
          lname: lnameText,
          email: emailText,
          password: passwordText,
        }),
      });

      if (internalError) {
        setInternalError(false);
      }
      // if (duplicateEmail) {
      //   setDuplicateEmail(false);
      // }

      console.log('ssdasdasd');
      console.log('Status Code: ', response);
      if (response.status === 200) {
        console.log('added');
        setFnameText('');
        setLnameText('');
        setEmailText('');
        setPasswordText('');
        if (duplicateEmail) {
          setDuplicateEmail(false);
        }
      } else if (response.status === 409) {
        setDuplicateEmail(true);
        console.log('duplicate Email');
        //   Alert.alert('Duplicate', 'Email already exists');
      } else {
        setInternalError(true);
        console.log('Internal Network Error during insertion');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="First Name"
          value={fnameText}
          onChangeText={(text) => setFnameText(text.trim())}
          style={styles.input}
        />
        {fnameError ? (
          <Text style={styles.error}>Invalid First Name</Text>
        ) : (
          <View />
        )}

        <TextInput
          placeholder="Last Name"
          value={lnameText}
          onChangeText={(text) => setLnameText(text.trim())}
          style={styles.input}
        />

        {lnameError ? (
          <Text style={styles.error}>Invalid Last Name</Text>
        ) : (
          <View />
        )}

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={emailText}
          onChangeText={(text) => setEmailText(text.trim())}
          style={styles.input}
        />

        {duplicateEmail ? (
          <Text style={styles.error}>Email Address already exists!</Text>
        ) : (
          <View />
        )}

        {emailError ? (
          <Text style={styles.error}>Invalid Email Address</Text>
        ) : (
          <View />
        )}

        {internalError ? (
          <Text style={styles.error}>Internal Error</Text>
        ) : (
          <View />
        )}

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={passwordText}
          onChangeText={(text) => setPasswordText(text)}
          style={styles.input}
        />
        {passwordError ? (
          <Text style={styles.error}>
            Invalid password! Minimum eight characters, at least one capital
            letter, one small letter and one digit.
          </Text>
        ) : (
          <View />
        )}

        <Button title="Sign Up" color="#393a3b" onPress={onSignUp} />
      </View>
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
            props.navigation.navigate('Login');
            // setLogin(true);
            // setFnameText('');
            // setLnameText('');
            // setEmailText('');
            // setPasswordText('');
            // setFnameError(false);
            // setLnameError(false);
            // setEmailError(false);
            // setPasswordError(false);
          }}>
          Login
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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

export default SignUpScreen;
