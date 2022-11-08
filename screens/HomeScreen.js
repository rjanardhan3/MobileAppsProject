import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {

  return (
      <View style={styles.container}>
        <Text style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin'}}>Get Current Recipes</Text>
        <TouchableOpacity
          style={styles.standardBtn} >
          <Text style={{ color: "#E1E2EF"}}>Get Current Recipes</Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={styles.standardBtn}
          onPress={() => navigation.navigate('TakePhotoScreen')}>
          <Text style={{ color: "#E1E2EF"}}>Take picture of Fridge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.standardBtn}
          onPress={() => navigation.navigate('IngredientListScreen')}>
          <Text style={{ color: "#E1E2EF"}}>Get List of Ingredients</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.standardBtn}
          onPress={() => navigation.navigate('FavoriteRecipes')}>
          <Text style={{ color: "#E1E2EF"}}>Favorite Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={{ color: "#05204A"}}>Go Back to Login</Text>
        </TouchableOpacity>

      </View>
    );

};

export default HomeScreen;

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
    backgroundColor:"#05204A",
  },
  loginBtn:
  {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
  }
});
