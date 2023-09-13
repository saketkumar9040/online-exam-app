import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { firebase } from "../firebase/firebaseConfig.js";
import { authenticate } from "../redux/authSlice.js";

const SignUpScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signUpHandler = async () => {
    try {
      if (userDetails.name === "") {
        return Alert.alert("Name cannot be empty");
      }
      if (userDetails.email === "") {
        return Alert.alert("E-mail cannot be empty");
      } else {
        const regex =
          /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!userDetails.email.match(regex)) {
          return Alert.alert("E-mail must be in valid format");
        }
      }
      if (userDetails.password === "") {
        return Alert.alert("Password cannot be empty");
      }

      // REGISTERING USER IN FIREBASE ====================================================>

      const registerUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          userDetails.email,
          userDetails.password
        );

      const { uid } = registerUser.user;
      console.log(uid)

      //  SAVING USER IN REALTIME DATABASE  ==============================================>

      let data = {
        uid: uid,
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        createdAt: new Date().toISOString(),
      };
      console.log(data)

       await firebase
        .database()
        .ref(`UserData/${uid}`)
        .set(data)

      dispatch(authenticate({ userData: data}));

      Alert.alert("hurray 🤗", "user created successfully");
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error🥵", "user registration failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <FontAwesome5 name="book-reader" size={100} color="#fff" />
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="user"
            size={24}
            color="#a569bd"
            value={userDetails.name}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            value={userDetails.name}
            onChangeText={(e) => setUserDetails({ ...userDetails, name: e })}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#a569bd" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your E-mail"
            value={userDetails.email}
            onChangeText={(e) => setUserDetails({ ...userDetails, email: e })}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#a569bd" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Password"
            value={userDetails.password}
            onChangeText={(e) =>
              setUserDetails({ ...userDetails, password: e })
            }
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => signUpHandler()}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.noAccountText}>Already have an account !</Text>
          <TouchableOpacity
            style={styles.registerButtonContainer}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.registerButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    height: "33%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a569bd",
    paddingTop: 40,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 15,
    borderWidth: 5,
    borderColor: "#a569bd",
    borderRadius: 10,
  },
  textInput: {
    fontSize: 20,
    paddingLeft: 20,
  },
  buttonContainer: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#a569bd",
    borderRadius: 50,
  },
  buttonText: {
    paddingHorizontal: 50,
    padding: 5,
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  noAccountText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#a569bd",
  },
  registerButtonContainer: {
    marginTop: 20,
    paddingHorizontal: 50,
    padding: 5,
    borderWidth: 3,
    borderColor: "green",
    borderRadius: 50,
  },
  registerButtonText: {
    fontSize: 17,
    fontWeight: "800",
    color: "green",
  },
});
