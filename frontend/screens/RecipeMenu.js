import {useState, useReducer, useEffect} from 'react';
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants/theme";
import {View, SafeAreaView, FlatList,Text, StyleSheet,TouchableOpacity} from 'react-native';
import RecipeCard from '../components/RecipeCard';
import {RecipeData} from '../constants/data';
import {LastRecipeQuery} from '../constants/data';
import { Dimensions } from "react-native";


const RecipeMenu = ({navigation, route}) => {
    //console.log("Recipe data " + JSON.stringify(RecipeData))
    const onPressBack = () => {
        console.log("Pressed back button")
        navigation.navigate("AddingIngredientScreen");
    }
    const onPressMenu = () => {
        console.log("Pressed menu button")
        navigation.navigate("Home");
    }
    const allRecipeData = route.params.allRecipeData
    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.horizView}>
            <TouchableOpacity onPress={onPressBack} style={styles.button}>
                <Text style={styles.buttonBackText}> Back </Text>
            </TouchableOpacity>
            <Text style={styles.recipesText}> Recipes </Text>
            <TouchableOpacity onPress={onPressMenu} style={styles.button}>
                <Text style={styles.buttonMenuText}> Menu </Text>
            </TouchableOpacity>
            </View>

            <FlatList
                data={allRecipeData}
                renderItem={({item}) =>  <RecipeCard oneRecipe={item} navigation={navigation} allRecipes={allRecipeData}/>}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.teal,
      },
    horizView: {
        height:75,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    recipesText: {
        color: COLORS.white,
        fontSize:SIZES.extraLarge,
        marginTop: 10
    },
    button: {
        backgroundColor: COLORS.white,
        padding: 17,
        borderRadius: 20,
        width:100,
        height: 50,
        marginLeft:5
    },
    buttonBackText: {
        color: COLORS.teal,
        fontSize: SIZES.Large,
        marginLeft:15
    },
    buttonMenuText: {
        color: COLORS.teal,
        fontSize: SIZES.Large,
        marginLeft:10
    }
  });



export default RecipeMenu;
