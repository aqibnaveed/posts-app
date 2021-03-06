import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import Person from './component/Person';
import AddPerson from './component/AddPerson';

const App = () => {
  useEffect(() => {
    readAllUsers();
  }, []);
  const [usersList, setUsersList] = useState([]);

  const readAllUsers = async () => {
    console.log('readAllUsers START:');
    try {
      const response = await fetch(`http://172.16.8.3:5000/read-all`);
      if (response.status === 200) {
        const responseJson = await response.json();
        if (await responseJson) {
          setUsersList(responseJson);
        }
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const personItemRender = (item) => {
    // console.log(item);
    return (
      <Person
        name={item.name ? item.name.first + ' ' + item.name.last : 'No Name'}
        email={item.email}
      />
    );
  };

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            data={usersList}
            scrollEnabled
            keyExtractor={(person) => person._id}
            renderItem={(person) => personItemRender(person.item)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 200,
  },
  flatlistStyle: {},
});

export default App;
