import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider,
getAuth,
signInWithPopup,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
} from "firebase/auth";

import {
getFirestore,
query,
getDocs,
collection,
where,
addDoc,
} from "firebase/firestore";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import logo from '../assets/fridge.jpg'

const firebaseConfig = {
  apiKey: "AIzaSyBbg0Nt6T_VhWeIGNP0nD44J6fyKfjHmfs",
  authDomain: "leftoverformula.firebaseapp.com",
  projectId: "leftoverformula",
  storageBucket: "leftoverformula.appspot.com",
  messagingSenderId: "336477759661",
  appId: "1:336477759661:web:ff8656f6e79dd3100d7e24",
  measurementId: "G-0WDHG8SVW8"
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  var isLogin = true
  var loginWithGoogle = false

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const buttonClick = async () => {
    if (isLogin) {
      if (loginWithGoogle) {
        signInWithGoogle()
      } else {
        logInWithEmailAndPassword(email, pass)
      }
    } else {

    }
  }

  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("There was an error creating the user and password. Please try again")
  });

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert("There has been an error signing in with Google. Please try again!");
    }
  };

  const logInWithEmailAndPassword = async (email, pass) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      console.error(err);
      alert("Invalid email or password. Please try again!");
    }
  };

  const registerWithEmailAndPassword = async (name, email, pass) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert("There has been an error registering your email and password. Please retry!");
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert("There has been an error sending the password!");
    }
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text
          style={styles.titleText}
          placeholder="Email."
          placeholderTextColor="#000000"
          textAlign='center'
        />
      </View>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          styles={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email)=>setEmail(email)}
          textAlign='center'
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          styles={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password)=>setPass(password)}
        />
      </View>
      <TouchableOpacity
        onPress={sendPasswordReset}
      >
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}
        onPress={logInWithEmailAndPassword}
        >
        <Text style={styles.loginText}>Login!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgot_button}>
        <Text style={styles.forgot_button}>Register for an Account</Text>
      </TouchableOpacity>
    </View>
  );

};

export default LoginScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: 'center'
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: 'center'
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
  loginBtn:
  {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"#FF1493",
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
