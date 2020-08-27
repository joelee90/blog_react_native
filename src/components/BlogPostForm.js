import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

const BlogPostForm = ({ onSubmit, initialValues, btnCreate, btnEdit }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  return (
    <View>
      <Text style={styles.label}>Enter title: </Text>
      <TextInput
        style={styles.input}
        height={50}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter content: </Text>
      <TextInput
        style={styles.input}
        height={200}
        multiline={true}
        value={content}
        onChangeText={(text) => setContent(text)}
      />

      {btnCreate ? (
        <Button title='New Post' onPress={() => onSubmit(title, content)} />
      ) : (
        <Button title='Save Post' onPress={() => onSubmit(title, content)} />
      )}
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: '',
    content: '',
  },
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default BlogPostForm;
