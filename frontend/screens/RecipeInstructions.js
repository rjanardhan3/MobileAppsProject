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
import RecipeInstructionCard from "../components/RecipeInstructionCard";

const RecipeInstructions = ({ navigation, route }) => {
  const onPressBack = () => {
    navigation.navigate("RecipeMenu");
  };
  const onPressMenu = () => {
    console.log("Pressed menu button");
    navigation.navigate("Home");
  };
  const recipeData = route.params.recipeData;


  const displayedRecipeData = Object.keys(recipeData)
    .filter((key) => {
      return (
        key != "title" &&
        key != "image" &&
        key != "id" &&
        key != "imageType" &&
        key != "healthScore" &&
        key != "readyInMinutes"
      );
    })
    .map((key) => {
      var val = recipeData[key]
      if (key == "unusedIngredients") {
        key = "not Used Ingredients"
      } else if (key == "missedIngredients") {
        key = "Missing Ingredients"
      } else if (key == "usedIngredients") {
        key = "Used Ingredients"
      }
      return {
        key: key.charAt(0).toUpperCase() + key.slice(1),
        value: val,
      };
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.horizView}>
        <TouchableOpacity onPress={onPressBack} style={styles.button}>
          <Text style={styles.buttonBackText}> Back </Text>
        </TouchableOpacity>
        <Text style={styles.healthScore}>
          {" "}
          Health Score: {recipeData.healthScore}{" "}
        </Text>
        <TouchableOpacity onPress={onPressMenu} style={styles.button}>
          <Text style={styles.buttonMenuText}> Menu </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.recipesText}> {recipeData.title} </Text>

      <Image style={styles.foodImage} source={{ uri: recipeData.image }} />
      <FlatList
        data={displayedRecipeData}
        renderItem={({ item }) => <RecipeInstructionCard data={item} />}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
//<SafeAreaView style={styles.container}>
//</SafeAreaView>
const styles = StyleSheet.create({
  scrollView: {},
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
    marginTop: 10,
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
    marginTop: 10,
  },
  recipeDescriptionText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    textAlign: "center",
    marginTop: 10,
  },
  recipeInstructionText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginTop: 10,
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

/* <FlatList
        data={displayedRecipeData}
        renderItem={({ item }) => (
          <RecipeInstructionCard data={item} />
        )}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      /> */

/*
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
        <Text style={styles.recipeInstructionText}> {listInstrutions}</Text>
      */

export default RecipeInstructions;
