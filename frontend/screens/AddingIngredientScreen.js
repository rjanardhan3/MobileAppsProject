import React, { useState,useReducer } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import uuid from 'react-native-uuid';
import { COLORS } from '../constants/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {LastRecipeQuery} from '../constants/data';

const AddingIngredientScreen = ({ navigation }) => {
  const [value, onChangeText] = React.useState('');
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  const getRecipeBaseUrl = "https://mobileappsproject.onrender.com/recipes?ingredients="
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [ingredients, setIngredients] = useState([{
      "id": uuid.v4(),
      "title": 'Tofu',
    },
    {
      "id": uuid.v4(),
      "title": 'Onions',
    },
    {
      "id": uuid.v4(),
      "title": "Tomato",
    },
    {
      "id": uuid.v4(),
      "title": "Red peppers",
    },
    ])
    const Item = ({ title }) => (
      <View>
        <TouchableOpacity>
          <Text style={styles.todo}>{title}</Text>
        </TouchableOpacity>
        <Button
          style={{ color: "#05204A", fontSize: 250, fontFamily: 'Cochin'}}
          title="Delete Ingredient"
          color= "white"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => {
            var temp = [];

            for (var i = 0; i < ingredients.length; i ++) {
              if (ingredients[i].title != title) {
                temp.push(ingredients[i]);
              }
            }

            //setValue("asdfadsf");
            setIngredients(temp);
          }}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={{ color: COLORS.white, fontSize: 25, fontFamily: 'Cochin'}}>Ingredients Found</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            placeholder = {"Type here to add ingredients!"}
            value = {value}
          />
        <FlatList
            data={ingredients}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        <View>
          <Button
            style={{fontSize: 25, fontFamily: 'Cochin'}}
            title="Add Ingredient to List"
            color= "white"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => {
              var temp = ingredients;
              var gone = false;
              if (value.trim().length == 0) {
                alert("Please insert an ingredient and not an empty item");
                return ;
              }
              for (var i = 0; i < temp.length; i ++) {
                if (temp[i].title == value) {
                  alert("This ingredient is already in your list");
                  gone = true;
                  return ;
                }
              }
              temp.push({
                "id": uuid.v4(),
                "title": value,
              });
              forceUpdate();
              setIngredients(temp);
            }}
          />
          <Button
            style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin'}}
            title="View Recipes"
            color= "white"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => {
              var ingredientsStr = ingredients.map((ingredient) => {
                return ingredient.title;
              })
              .join(",+");
              //console.log("ingredients " + ingredientsStr)
              const getRecipeUrl = getRecipeBaseUrl + ingredientsStr
              //console.log("get recipe " + getRecipeUrl)
              axios.get(getRecipeUrl).then((res) => {
                //console.log("LastRecipe Query " + res.data.body.recipes)
                navigation.navigate("RecipeMenu", {allRecipeData: res.data.body.recipes});
              }).catch((error) => {
                console.log("error " + error );
              })
            }}
          />
        </View>
        <Text></Text>
        <Text></Text>

      </View>
    );
};

export default AddingIngredientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todo: {
    margin: 10,
    backgroundColor: 'white',
    color: 'teal',
    fontSize: 10,
    padding: 10,
    textAlign: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:COLORS.white
  }
});
