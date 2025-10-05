import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


export default function HomeScreen() {
  const [itemId, setItemId] = useState(0);
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl mb-4">Home Screen</Text>
    </View>
  );
}
