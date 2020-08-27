import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const { state, getBlogPosts, deleteBlogPost } = useContext(Context);

  useEffect(() => {
    getBlogPosts();
    //When component first renders
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });
    //When returned to screen, do fetch again.

    return () => {
      listener.remove();
    };
    // return function in useEffect function, only invoked when instance of IndexScreen is
    // ever completely stopped showing on the screen.
    // If component is no longer visible, clean up.
  }, []);

  return (
    <>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Show', { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name='trash-2' />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <AntDesign style={styles.write} name='plus' size={24} color='black' />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
  write: {
    paddingRight: 20,
  },
});

export default IndexScreen;
