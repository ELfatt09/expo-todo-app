import React, { useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, Pressable } from 'react-native'


import { useAuth } from 'context/authContext';
import { Ionicons } from '@expo/vector-icons';

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [page, setPage] = useState("login");
    const { handleSignIn, handleSignUp, loading } = useAuth();
    
    const handleSignUpPress = () => {
        handleSignUp(email, password);
      };
    
      const handleSignInPress = () => {
        handleSignIn(email, password);
      };

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      {/* Title */}
      <Text className="text-4xl font-bold mb-16">
        {page === "login" ? "Masuk ke akun Anda" : "Buat akun baru"}
        {"\n"}anda
      </Text>

      {/* Username Input */}
      {page === "signup" && (
        <TextInput
          className="border-b text-xl border-gray-300 mb-10 py-2"
          placeholder="Nama pengguna"
          value={username}
          onChangeText={setUsername}
        />
      )}

      {/* Email Input */}
      <TextInput
        className="border-b text-xl border-gray-300 mb-10 py-2"
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        className="border-b text-xl border-gray-300 mb-16  py-2"
        placeholder="Kata sandi"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign Up Button */}
      <TouchableOpacity onPress={page === "login" ? handleSignInPress : handleSignUpPress} className="mb-5 bg-black py-4 rounded-xl items-center">
        <Text className="text-white text-base font-semibold">{loading ? "Sedang..." : page === "login" ? "Masuk" : "Daftar"}</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="flex-row justify-center mt-10 text-lg">
        {page === "login" ? (
          <>
            <Text className="text-gray-700">Belum punya akun? </Text>
            <TouchableOpacity onPress={() => setPage("signup")}>
              <Text className="font-bold text-black">Daftar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text className="text-gray-500">Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => setPage("login")}>
              <Text className="font-bold text-black">Masuk</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View className="mt-16">
        <Text className="text-center text-gray-500 mb-2">Atau lanjutkan dengan:</Text>
              <GoogleSignIn />
      </View>
    </View>
  )
}


function GoogleSignIn() {
  const { handleGoogleSignIn } = useAuth();

  return <Pressable onPress={handleGoogleSignIn}>
    <Ionicons name="logo-google" size={48} color="black" style={{ alignSelf: 'center', marginTop: 20 }} />
  </Pressable>;
}
