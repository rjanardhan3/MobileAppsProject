import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const FavoriteRecipes = ({ navigation }) => {
  const [value, onChangeText] = React.useState('');
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  const [todos, setTodo] = useState([{
      "userId": 1,
      "id": 1,
      "title": "Chicken Alfredo",
      "completed": false,
    },
    {
      "userId": 1,
      "id": 2,
      "title": "Potatos",
      "completed": false,
    },
    {
      "userId": 1,
      "id": 9,
      "title": "Pineapple",
      "completed": false,
    },
    {
      "userId": 1,
      "id": 9,
      "title": "Pineapple",
      "completed": false,
    },
    {
      "userId": 1,
      "id": 9,
      "title": "Pineapple",
      "completed": false,
    },
    {
      "userId": 1,
      "id": 9,
      "title": "Pineapple",
      "completed": false,
    },
    {
      "userId": 1,
      "id": 10,
      "title": "Broccoli",
      "completed": true,
    }])
    const Item = ({ title }) => (
      <View>
        <TouchableOpacity>
          <Text style={styles.todo}>
            {title}{"\n"}
            <Text style={styles.todoSmallText}>Click to view Ingredients and Instructions</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin'}}>Favorite Recipes</Text>
        <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        <Text></Text>
        <Text></Text>

      </View>
    );
};

export default FavoriteRecipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todo: {
    margin: 10,
    backgroundColor: '#B497D6',
    color: 'white',
    fontSize: 20,
    padding: 10,
    fontFamily: 'Cochin',
  },
  todoSmallText: {
    margin: 10,
    color: 'white',
    fontSize: 10,
    padding: 10,
    fontFamily: 'Cochin',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
