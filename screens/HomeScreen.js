import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

const HomeScreen = ({ navigation }) => {

  <View style={styles.container}>
    <StatusBar style="auto" />
    <View style={styles.standardBtn}>
      <Text style>Get Current Recipes</Text>
    </View>
    <View style={styles.standardBtn}>
      <Text style>Take picture of Fridge</Text>
    </View>
    <View style={styles.standardBtn}>
      <Text style>Favorite Recipes</Text>
    </View>
    <TouchableOpacity
      style={styles.standardBtn}
      onPress={() => navigation.navigate("Login")}}
    >
      <Text>Go Back to Login</Text>
    </TouchableOpacity>
  </View>

}

export default HomeScreen;

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
