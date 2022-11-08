import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import FavoriteRecipes from './screens/FavoriteRecipes';
import AddingIngredientScreen from './screens/AddingIngredientScreen';
import HomeScreen from './screens/HomeScreen.js';
import IngredientListScreen from './screens/IngredientListScreen';
import TakePhotoScreen from './screens/TakePhotoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="IngredientListScreen"
          component={IngredientListScreen}
        />
        <Stack.Screen
          name="TakePhotoScreen"
          component={TakePhotoScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="FavoriteRecipes"
          component={FavoriteRecipes}
        />
        <Stack.Screen
          name="AddingIngredientScreen"
          component={AddingIngredientScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
