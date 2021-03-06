import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Post = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{props.author}</Text>
        {props.editStatus ? (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              onPress={() => {
                console.log('on press EDIT');
              }}>
              {' '}
              Edit{' '}
            </Text>
            <Text
              onPress={() => {
                console.log('on press DELETE');
              }}>
              Delete{' '}
            </Text>
          </View>
        ) : (
          <View />
        )}
      </View>

      <Text style={styles.message}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  header: {
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  message: {
    color: 'grey',
  },
});

export default Post;
