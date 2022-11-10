import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";
import LoginScreen from './screens/LoginScreen';
import FavoriteRecipes from './screens/FavoriteRecipes';
import AddingIngredientScreen from './screens/AddingIngredientScreen';
import HomeScreen from './screens/HomeScreen.js';
import IngredientListScreen from './screens/IngredientListScreen';
import TakePhotoScreen from './screens/TakePhotoScreen';
import RecipeMenu from './screens/RecipeMenu';
import RecipeInstructions from './screens/RecipeInstructions';
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "./constants/theme";

const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf")
  });
  if(!loaded) return null;

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
        <Stack.Screen
          name="RecipeMenu"
          component={RecipeMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeInstructions"
          component={RecipeInstructions}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
