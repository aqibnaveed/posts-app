import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import Post from '../component/Post';

import PostList from '../component/PostList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = (props) => {
  const [postText, setPostText] = useState('');
  const [postsList, setPostsList] = useState([]);
  const [postAdd, setPostAdd] = useState(false);

  const [messageError, setMessageError] = useState(false);

  const [internalError, setInternalError] = useState(false);
  const {user} = props.route.params;
  console.log(user);

  let name;
  let token;
  if (user) {
    name = user.user.name.first + ' ' + user.user.name.last;
    token = user.accessToken;
  } else {
    name = 'undefined name';
    token = 'Invalid Token!';
  }

  useEffect(() => {
    getAuthenticateToken();
  }, []);

  useEffect(() => {
    if (token) {
      readAllPosts();
    } else {
      console.log('loading');
    }
  }, [postAdd]);

  const getAuthenticateToken = async () => {
    console.log('getAuthenticateToken');
    token = await AsyncStorage.getItem('token');
    if (await token) {
      console.log('token get from asyn');
      readAllPosts();
    }
  };

  const readAllPosts = async () => {
    console.log('read All Posts START:');
    try {
      const response = await fetch(`http://172.16.8.3:5000/posts/read-all`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await token),
        },
      });

      console.log(response.status);
      if (response.status === 200) {
        const responseJson = await response.json();
        if (await responseJson) {
          setPostsList(responseJson);
        }
      } else if (response.status === 403) {
        console.log('Auth code not verified.');
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const postItemRender = (item) => {
    const status = name === item.author ? true : false;
    return (
      <Post
        editStatus={status}
        author={item.author}
        message={item.message}
        date={item.date}
      />
    );
  };

  console.log('User Name: (Dashboard) ', name);

  const validateMessage = () => {
    return postText.length > 1 ? true : false;
  };

  const onAddPost = () => {
    const date = new Date();
    console.log('Add new Post: ', name, postText, date);

    const status = validateMessage();
    if (status) {
      console.log('valid Message');
      if (messageError) {
        setMessageError(false);
      }
    } else {
      console.log('invalid Message');
      setMessageError(true);
    }

    if (status) {
      console.log('Call "ADD POST" here');
      addPost(name, postText, date);
    }

    console.log(name, postText, date);
  };

  const addPost = async (author, message, date) => {
    console.log('add Post START:');
    try {
      const response = await fetch('http://172.16.8.3:5000/add-post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await token),
        },
        body: JSON.stringify({
          message: message,
          author: author,
          date: date,
        }),
      });

      if (internalError) {
        setInternalError(false);
      }

      console.log('ssdasdasd');
      console.log('Status Code: ', response);
      if (response.status === 200) {
        console.log('added');
        setPostText('');
        setPostAdd(!postAdd);
      } else {
        setInternalError(true);
        console.log('Internal Network Error during post insertion');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const addNewPost = (author, message, date) => {
  //   console.log('Add new Post: ', author, message, date);
  // };

  return (
    <View style={styles.container}>
      <View style={{maxHeight: '20%'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: 16,
            color: '#393a3b',
            textAlign: 'right',
          }}
          onPress={() => {
            props.navigation.navigate('Login');
          }}>
          Logout
        </Text>
        <TextInput
          placeholder="Add a new Post..."
          multiline={true}
          value={postText}
          onChangeText={(text) => setPostText(text)}
          style={styles.input}
        />
        <Button title="Post" color="#393a3b" onPress={onAddPost} />
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={postsList}
          scrollEnabled
          keyExtractor={(post) => post._id}
          renderItem={(post) => postItemRender(post.item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    color: 'grey',
  },
  message: {
    color: 'black',
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
    maxHeight: '70%',
  },
  flatlist: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingBottom: '5%',
    maxHeight: '80%',
  },
});

export default DashboardScreen;
