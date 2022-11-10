import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants/theme";

const RecipeCard = ({ oneRecipe, navigation, allRecipes }) => {
  const imgUrl = oneRecipe.image;
  onPressCard = () => {
    navigation.navigate('RecipeInstructions', { oneRecipe: oneRecipe, allRecipes: allRecipes })
  }
  return (
    <TouchableOpacity
      onPress={onPressCard}
      style={styles.container}
    >
      <View style={styles.rowContainer}>
        <Image
          style={styles.foodImage}
          source={{ uri: imgUrl }}
        />

          <Text
              style={{
                color: COLORS.teal,
                fontSize: SIZES.extraLarge,
                marginLeft:10,
                flexShrink:1,
                flexWrap:'wrap'
              }}>
              {oneRecipe.title + "\n" + "Cooking Time: " + oneRecipe.readyInMinutes + " min"
              + "\n" + "Health Points: " + oneRecipe.healthScore + "\n"}
            </Text>

      </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.font,
    marginBottom: SIZES.extraLarge,
    margin: SIZES.base,
    ...SHADOWS.dark,
  },
  rowContainer: {
    width: Dimensions.get("window").width,
    minHeight: 100,
    overflow: 'hidden',
    flexDirection: "row",
    flex: 1,
  },
  foodImage: {
    width: "30%",
    height: "80%",
    marginTop: 10,
    marginLeft:10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
  }
});

export default RecipeCard;
