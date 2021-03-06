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

import Post from './Post';

const PostList = (props) => {
  useEffect(() => {
    readAllPosts();
  }, []);

  const readAllPosts = async () => {
    console.log('read All Posts START:');
    try {
      const response = await fetch(`http://172.16.8.3:5000/posts/read-all`);
      if (response.status === 200) {
        const responseJson = await response.json();
        if (await responseJson) {
          props.setPostsList(responseJson);
        }
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const postItemRender = (item) => {
    // console.log(item);
    return (
      <Post author={item.author} message={item.message} date={item.date} />
    );
  };

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            data={props.postsList}
            scrollEnabled
            keyExtractor={(post) => post._id}
            renderItem={(post) => postItemRender(post.item)}
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

export default PostList;
