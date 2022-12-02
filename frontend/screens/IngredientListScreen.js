import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';


const IngredientListScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([{
      "userId": 1,
      "ingredientId": 1,
      "title": "Bellpepper",
    },
    {
      "userId": 2,
      "ingredientId": 8,
      "title": "Jalapeno",
    },
    {
      "userId": 3,
      "ingredientId": 9,
      "title": "Lettuce",
    },
    {
      "userId": 4,
      "ingredientId": 10,
      "title": "Apricot",
    }])
  const [addIngredient, setAddIngredient] = React.useState('');
  const [value, onChangeText] = React.useState('');
  const [lk, setLk] = React.useState(0);
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
    const Item = ({ title }) => (
      <View>
        <TouchableOpacity>
          <Text style={styles.todo}>
            {title}
          </Text>
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
              setTodos(temp);
            }}
          />
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin'}}>Ingredients</Text>

        <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={item => item.userId}
        />
        <TextInput
          style={{height: 40, borderColor: 'black', margin: 12, borderWidth: 1, padding: 10, color:'#595959', fontSize:20, marginHorizontal:5}}
          onChangeText={text => setAddIngredient(text)}
          placeholder="Add an Ingredient"
          value = {addIngredient}
        />
        <Button
          style={{ color: "#05204A", fontSize: 250, fontFamily: 'Cochin'}}
          title="Add Ingredient"
          color="#841584"
          accessibilityLabel="Learn more about this blue button"
          onPress={() => {
            var temp = [];
            temp = todos
            if (addIngredient == "") {
              alert("You must input text into the textField to add an ingredient")
            } else {
              var temp2 = {
                "userId": 20+lk,
                "ingredientId": 21+lk,
                "title": addIngredient,
              }
              temp.push(temp2)
              setLk(lk+1)
              setAddIngredient("")
              setTodos(temp)
            }
          }}
        />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{ color: "black"}}>Home</Text>
        </TouchableOpacity>
        <Text></Text>
        <Text></Text>
      </View>
    );
};

export default IngredientListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todo: {
    margin: 10,
    backgroundColor: '#FF8E72',
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
