import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from 'expo-font';
import { Ionicons } from "@expo/vector-icons";
import "./global.css";

import Profile from "./components/Profile";
import Todo from "./components/ToDo";
import Auth from "components/auth";
import { AuthProvider, useAuth } from "context/authContext";
import { TouchableOpacity, View, Text } from "react-native";

export type RootStackParamList = {
  Auth: undefined;
  Todo: undefined;
  Profile: undefined;
  Home: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function MainTabs() {
  const { session, handleSignOut }= useAuth(); // ✅ sekarang ini ada di dalam AuthProvider

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          } else if (route.name === "Todo") {
            iconName = "list";
          } else if (route.name === "Auth") {
            iconName = "log-in-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerRight: () => (
          <TouchableOpacity
            className="mr-4"
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
          
      })
      
      }
    >
      {/* <Tab.Screen name="Home" component={Homepage} />
       */}
      {!session ? (
        <Tab.Screen name="Auth" component={Auth} />
      ) : (
          <>
        <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Todo" component={Todo} />
          </>
      )}
    </Tab.Navigator>
  );
}

export default function App() {

  useFonts({ ...Ionicons.font });
  useFonts(Ionicons.font);


  return (
    <AuthProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </AuthProvider>
  );
}
