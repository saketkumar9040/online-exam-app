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
import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { authenticate } from "../redux/authSlice";

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    try {
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

      // LOGIN IN FIREBASE  =================================================================>

      const loginUser = await firebase
        .auth()
        .signInWithEmailAndPassword(userDetails.email, userDetails.password);

      const { uid } = loginUser.user;

      // GET USER FROM REALTIME DATABASE  ====================================================>

      const userData = await firebase
        .database()
        .ref(`UserData/${uid}`)
        .once("value",(snapshot) => {
          setUserData(snapshot.val());
        });

      dispatch(authenticate({userData}));
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error😰", "failed to login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <FontAwesome5 name="book-reader" size={100} color="#fff" />
      </View>
      <ScrollView>
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
          onPress={() => loginHandler()}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.noAccountText}>Doesn't have an account !</Text>
          <TouchableOpacity
            style={styles.registerButtonContainer}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.registerButtonText}> REGISTER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    height: "40%",
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
