import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TestScreen from "../screens/TestScreen";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={30}
              color={focused ? "#a569bd" : "grey"}
            />
          ),
          tabBarActiveTintColor: "#a569bd",
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="clipboard-list"
              size={24}
              color={focused ? "#a569bd" : "grey"}
            />
          ),
          tabBarActiveTintColor: "#a569bd",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#a569bd" : "grey"}
            />
          ),
          tabBarActiveTintColor: "#a569bd",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
