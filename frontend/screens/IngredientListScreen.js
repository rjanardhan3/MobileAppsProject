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
  const [value, onChangeText] = React.useState('');
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
    const Item = ({ title }) => (
      <View>
        <TouchableOpacity>
          <Text style={styles.todo}>
            {title}
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
        <Text style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin'}}>Ingredients</Text>

        <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={item => item.userId}
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
  buttonImageIconStyle: {
    height: null,
    width: "10%",
    alignSelf: 'center',
    resizeMode: 'contain'
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
