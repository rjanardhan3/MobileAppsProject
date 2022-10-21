import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const IngredientListScreen = {( navigation )} => {
  const [todos, setTodos] = useState([{
      "userId": 1,
      "ingredientId": 1,
      "title": "Bellpepper",
    },
    {
      "userId": 1,
      "ingredientId": 8,
      "title": "Jalapeno",
    },
    {
      "userId": 1,
      "ingredientId": 9,
      "title": "Lettuce",
    },
    {
      "userId": 1,
      "ingredientId": 10,
      "title": "Apricot",
    }])

    return (
      <View style={styles.container}>
        <ScrollView>
          {todos.map(todo => (<View key={todo.id} style={styles.todo}>
          <Text>{todo.title}</Text>
          </View>)
        )}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: "center",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  standardBtn:
  {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"#FF1493",
  }
});
