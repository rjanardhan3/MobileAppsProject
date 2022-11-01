import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login Screen' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Login Screen' }}
        />
        <Stack.Screen
          name="IngredientList"
          component={IngredientListScreen}
          options={{ title: "Ingredient List"}}
        />
        <Stack.Screen
          name="TakePhoto"
          component={TakePhotoScreen}
          options={{ title: "Take Photo"}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
