import { useState, useReducer, useEffect } from "react";
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants/theme";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ReactHtmlParser from "html-react-parser";

const RecipeInstructions = ({ navigation, route }) => {
  const onPressBack = () => {
    console.log("Pressed back button");
    navigation.navigate("RecipeMenu");
  };
  const onPressMenu = () => {
    console.log("Pressed menu button");
    navigation.navigate("Home");
  };
  const recipeData = route.params.recipeData;
  const diets = recipeData.diets.map(diet => {
    if (diet.length==0){
      return
    }
    return diet.charAt(0).toUpperCase() + diet.slice(1)
  }).join()
  const dishTypes = recipeData.dishTypes.map(dish => {
    if (dish.length==0){
      return
    }
    return dish.charAt(0).toUpperCase() + dish.slice(1)
  }).join()
  const unusedIngredients = recipeData.unusedIngredients.map(i => {
    if (i.length==0){
      return
    }
    return i.charAt(0).toUpperCase() + i.slice(1)
  }).join()
  const usedIngredients = recipeData.usedIngredients.map(i => {
    if (i.length==0){
      return
    }
    return i.charAt(0).toUpperCase() + i.slice(1)
  }).join()
  const neededIngredients = recipeData.missedIngredients.map(i => {
    if (i.length==0){
      return
    }
    return i.charAt(0).toUpperCase() + i.slice(1)
  }).join()

  console.log(recipeData);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.horizView}>
          <TouchableOpacity onPress={onPressBack} style={styles.button}>
            <Text style={styles.buttonBackText}> Back </Text>
          </TouchableOpacity>
          <Text style={styles.healthScore}> Health Score: {recipeData.healthScore} </Text>
          <TouchableOpacity onPress={onPressMenu} style={styles.button}>
            <Text style={styles.buttonMenuText}> Menu </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.recipesText}> {recipeData.title} </Text>

        <Image
          style={styles.foodImage}
          source={{ uri: recipeData.image }}
        />
        <Text style={styles.recipeHeaderText}> Diets: </Text>
        <Text style={styles.recipeDescriptionText}> {diets} </Text>
        <Text style={styles.recipeHeaderText}> Dish Types: </Text>
        <Text style={styles.recipeDescriptionText}> {dishTypes} </Text>
        <Text style={styles.recipeHeaderText}> Obtained Ingredients: </Text>
        <Text style={styles.recipeDescriptionText}> {usedIngredients} </Text>
        <Text style={styles.recipeHeaderText}> Ingredients Needed </Text>
        <Text style={styles.recipeDescriptionText}> {neededIngredients} </Text>
        <Text style={styles.recipeHeaderText}> Ingredients Unused </Text>
        <Text style={styles.recipeDescriptionText}> {unusedIngredients} </Text>
        <Text style={styles.recipeHeaderText}> Instructions: </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
//<SafeAreaView style={styles.container}>
//</SafeAreaView>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.teal,
  },
  horizView: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  healthScore: {
    color: COLORS.white,
    fontSize: SIZES.extraLarge,
    textAlign: "center",
    marginTop:10
  },
  recipesText: {
    color: COLORS.white,
    fontSize: SIZES.extraLarge,
    textAlign: "center",
  },
  recipeHeaderText: {
    color: COLORS.white,
    fontSize: SIZES.extraLarge,
    textAlign: "center",
    marginTop:10
  },
  recipeDescriptionText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    textAlign: "center",
    marginTop:10
  },
  button: {
    backgroundColor: COLORS.white,
    padding: 17,
    borderRadius: 20,
    width: 100,
    height: 50,
  },
  buttonBackText: {
    color: COLORS.teal,
    fontSize: SIZES.Large,
    marginLeft: 15,
  },
  buttonMenuText: {
    color: COLORS.teal,
    fontSize: SIZES.Large,
    marginLeft: 10,
  },
  foodImage: {
    width: "90%",
    height: "40%",
    marginTop: 10,
    textAlign: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
  },
});


export default RecipeInstructions;
