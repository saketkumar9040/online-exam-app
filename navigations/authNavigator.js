import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MainNavigator from "./MainNavigator";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

  const isauth = useSelector((state)=> state.auth.userData !== null);

  return (
    <NavigationContainer>
      { isauth ? (
          <MainNavigator/>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AuthNavigator;
