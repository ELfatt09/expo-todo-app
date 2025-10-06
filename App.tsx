import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useFonts } from 'expo-font';
import { Ionicons } from "@expo/vector-icons";
import "./global.css";

import Todo from "./components/ToDo";
import Auth from "components/auth";
import { AuthProvider, useAuth } from "context/authContext";
import { TouchableOpacity, View, Text } from "react-native";

function Navigate() {
  const { session, handleSignOut, userData } = useAuth();

  return (
    <>
      {session && (
        <View className="sticky top-0 z-50 bg-white flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <Text className="text-lg font-bold">{userData.email}</Text>
          <TouchableOpacity className="flex flex-row  items-center" onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={32} color="red" />
        </TouchableOpacity>
      </View>
      )}
      
      {session ? <Todo /> : <Auth />}
    </>
  )
}

function App() {
  useFonts({ ...Ionicons.font });
  useFonts(Ionicons.font);

  return (
    <AuthProvider>
      <Navigate />
    </AuthProvider>
  );
}

export default App;

