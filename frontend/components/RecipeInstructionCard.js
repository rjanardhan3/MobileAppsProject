import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants/theme";

const RecipeInstructionCard = ({ data }) => {
  var value = null;

  if (data.key == "Diets") {
    value = data.value
      .map((diet) => {
        if (diet.length == 0) {
          return;
        }
        let str = diet.charAt(0).toUpperCase() + diet.slice(1);
        return str;
      })
      .join(", ");
  } else if (data.key == "DishTypes") {
    value = data.value
      .map((dish) => {
        if (dish.length == 0) {
          return;
        }
        return dish.charAt(0).toUpperCase() + dish.slice(1);
      })
      .join(", ");
  } else if (data.key == "Instructions") {
    value = data.value.map((instruction, index) => {
      if (instruction.length == 0) {
        return;
      }
      index += 1;
      return index.toString() + ". " + instruction + "\n\n";
    });
  } else if (data.key == "Used Ingredients") {
    value = data.value
      .map((i) => {
        if (i.length == 0) {
          return;
        }
        return i.charAt(0).toUpperCase() + i.slice(1);
      })
      .join();
  } else if (data.key == "Missing Ingredients") {
    value = data.value
      .map((i) => {
        if (i.length == 0) {
          return;
        }
        return i.charAt(0).toUpperCase() + i.slice(1);
      })
      .join(", ");
  } else if (data.key == "Not Used Ingredients") {
    value = data.value
      .map((i) => {
        if (i.length == 0) {
          return;
        }
        return i.charAt(0).toUpperCase() + i.slice(1);
      })
      .join(", ");
  } else {
    value = data.value;
  }
  return (
    <SafeAreaView>
      <Text style={styles.recipeHeaderText}> {data.key} </Text>
      <Text style={styles.recipeDescriptionText}> {value} </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.teal,
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
});

export default RecipeInstructionCard;
