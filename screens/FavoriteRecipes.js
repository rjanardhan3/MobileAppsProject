import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

const FavoriteRecipes = ({ navigation }) => {
  <View style={styles.container}>
    <StatusBar style="auto" />
    <TouchableOpacity
      style={styles.standardBtn}
      onPress={() => navigation.navigate("HomeScreen")}}
    >
      <Text>Go Home</Text>
    </TouchableOpacity>
  </View>
}

export default FavoriteRecipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: "center",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  standardBtn:
  {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"#FF1493",
  }
});
