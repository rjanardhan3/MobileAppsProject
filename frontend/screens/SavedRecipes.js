import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants/theme";
import RecipeCard from '../components/RecipeCard';

const SavedRecipes = ({ navigation,route}) => {
  const [value, onChangeText] = React.useState('');
  const savedRecipes = route.params.savedRecipes
  console.log("saved Recipes " + savedRecipes)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.horizView}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.menuButton}>
            <Text style={styles.buttonMenuText}> Menu </Text>
          </TouchableOpacity>
          <Text style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin', marginLeft:30}}>Favorite Recipes</Text>
        </View>
        <FlatList
            data={savedRecipes}
            renderItem={({item}) =>  <RecipeCard oneRecipe={item} navigation={navigation} allRecipes={savedRecipes}/>}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}/>
      </SafeAreaView>
    );
};

export default SavedRecipes;

const styles = StyleSheet.create({
  horizView: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: 'teal',
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
  },
  menuButton: {
    color: COLORS.white,
    marginLeft: 10,
  },
  buttonMenuText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginLeft: 0,
  },
});
