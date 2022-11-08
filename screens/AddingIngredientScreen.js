import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const AddingIngredientScreen = ({ navigation }) => {
  const [value, onChangeText] = React.useState('');
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  const [todos, setTodo] = useState([{
      "userId": 1,
      "id": 1,
      "title": "Apples",
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
          <Text style={styles.todo}>{title}</Text>
        </TouchableOpacity>
        <Button
          style={{ color: "#05204A", fontSize: 250, fontFamily: 'Cochin'}}
          title="Delete Ingredient"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => {
            var temp = [];

            for (var i = 0; i < todos.length; i ++) {
              if (todos[i].title != title) {
                temp.push(todos[i]);
              }
            }

            //setValue("asdfadsf");
            setTodo(temp);
          }}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin'}}>Ingredients Found</Text>
        <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        <View>
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            placeholder = {"Type here to add ingredients!"}
            value = {value}
          />
          <Button
            style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin'}}
            title="Add Ingredient to List"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => {
              var temp = todos;
              var gone = false;
              if (value.trim().length == 0) {
                alert("Please insert an ingredient and not an empty item");
                return ;
              }
              for (var i = 0; i < temp.length; i ++) {
                if (temp[i].title == value) {
                  alert("This ingredient is already in your list");
                  gone = true;
                  return ;
                }
              }
              temp.push({
                "userId": 1,
                "id": 19,
                "title": value,
                "completed": false,
              });
              //setValue("asdfadsf");
              setTodo(temp);
            }}
          />
          <Button
            style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin'}}
            title="View Recipes"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => {
              navigation.navigate("RecipeMenu");
            }}
          />
        </View>
        <Text></Text>
        <Text></Text>

      </View>
    );
};

export default AddingIngredientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todo: {
    margin: 10,
    backgroundColor: 'deeppink',
    color: 'white',
    fontSize: 10,
    padding: 10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
