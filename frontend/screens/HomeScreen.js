import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants/theme";
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Image} from 'react-native';
import axios from "axios";
import {API_KEY} from '@env'

const HomeScreen = ({ navigation }) => {
  const getSavedRecipeUrl = "https://mobileappsproject.onrender.com/saved-recipes?api_key=" + API_KEY;
  return (
      <View style={styles.container}>
        <Text style={{ color: "lightgray", fontSize: 25, fontFamily: 'Cochin', marginTop:10}}>RefrigASaver</Text>
        <Image
          style={styles.fridge}
          source={require('../assets/MainFridge.png')}
        />
        <TouchableOpacity
          style={styles.standardBtn}
          onPress={() => navigation.navigate('TakePhotoScreen')}>
          <Text style={{ color: "black"}}>Take a Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.standardBtn}
          onPress={() => {
            axios.get(getSavedRecipeUrl).then((res) => {
              navigation.navigate('SavedRecipes', {savedRecipes: res.data.body});
            }).catch((error) => {
              console.log("error " + JSON.stringify(error));
            })
          }}>
          <Text style={{ color: "black"}}>Saved Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.standardBtn}
          onPress={() => navigation.navigate('IngredientListScreen')}>
          <Text style={{ color: "black"}}>View Current Ingredients</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.standardBtn}
          onPress={() => navigation.navigate('RecipeMenu')}>
          <Text style={{ color: "black"}}>View Current Recipes</Text>
        </TouchableOpacity>
      </View>
    );

};

export default HomeScreen;

const styles = StyleSheet.create({
  fridge: {
    width: "55%",
    height: "40%",
    marginTop: 10,
    marginLeft:10,

  },
  container: {
    flex: 1,
    backgroundColor: COLORS.teal,
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
    backgroundColor:'lightgray',


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

/*
        <TouchableOpacity
          style={styles.standardBtn}
          onPress={() => navigation.navigate('IngredientListScreen')}>
          <Text style={{ color: "#E1E2EF"}}>Get List of Ingredients</Text>
        </TouchableOpacity>
*/
