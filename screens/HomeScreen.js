import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

const HomeScreen = ({ navigation }) => {

  <View style={styles.container}>
      <Text style={{ color: "#05204A", fontSize: 25, fontFamily: 'Cochin'}}>Get Current Recipes</Text>
      <TouchableOpacity style={styles.standardBtn}>
        <Text style={{ color: "#E1E2EF"}}>Get Current Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.standardBtn}>
        <Text style={{ color: "#E1E2EF"}}>Take picture of Fridge</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.standardBtn}>
        <Text style={{ color: "#E1E2EF"}}>Get List of Ingredients</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.standardBtn}>
        <Text style={{ color: "#E1E2EF"}}>Favorite Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
      >
        <Text style={{ color: "#05204A"}}>Go Back to Login</Text>
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
    backgroundColor:"#05204A",
  },
  loginBtn:
  {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
  }
});
