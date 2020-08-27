import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { AntDesign } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const blogPost = state.find(
    (blogPost) => blogPost.id === navigation.getParam('id')
  );
  return (
    <View style={styles.blog}>
      <Text style={styles.title}>{blogPost.title}</Text>
      <Text style={styles.content}>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Single Blog',
    headerRight: () => (
      <TouchableOpacity
        style={styles.edit}
        onPress={() =>
          navigation.navigate('Edit', { id: navigation.getParam('id') })
        }
      >
        <AntDesign name='edit' size={24} color='black' />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  edit: {
    paddingRight: 20,
  },
  blog: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
  },
  content: {
    fontSize: 20,
    paddingTop: 10,
  },
});

export default ShowScreen;
