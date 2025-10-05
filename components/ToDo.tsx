import React, { useState, useEffect } from "react";
import { supabase } from '../lib/supabase'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Pressable } from "react-native";
import { useAuth } from "context/authContext";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function App() {
  useFonts({ 'Ionicons': Ionicons.font });
  const session = useAuth();
  // 🟢 State untuk input teks (tempat user ngetik)
  const [task, setTask] = useState("");

  // 🟢 State untuk menyimpan list todo
  const [todos, setTodos] = useState<any[]>([]);

  // 🟢 Fungsi tambah todo


      const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) console.error(error)
      else setTodos(data || [])
    }
  const addTodo = async () => {
    if (!task.trim()) return;
    const {error} = await supabase.from('todos').insert({
      title: task,
      is_done: false
    })
    if (error) console.error(error)
    setTask("");

  };

  const updateTodo = async (id: number, is_done: boolean) => {
    const { error } = await supabase.from('todos').update({ is_done: !is_done }).eq('id', id)
    if (error) console.error(error)

   }

  // 🟢 Fungsi hapus todo berdasarkan index
  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (error) console.error(error)

  };

    useEffect(() => {
  fetchTodos();

  const channel = supabase
    .channel("todos-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "todos" },
      (payload) => {
        console.log("Realtime update:", payload);

        if (payload.eventType === "INSERT") {
          setTodos((prev) => [payload.new, ...prev]);
        }
        if (payload.eventType === "UPDATE") {
          setTodos((prev) =>
            prev.map((todo) => (todo.id === payload.new.id ? payload.new : todo))
          );
        }
        if (payload.eventType === "DELETE") {
          setTodos((prev) => prev.filter((todo) => todo.id !== payload.old.id));
        }
      }
    );

  // 🟢 subscribe harus async
  const subscribeChannel = async () => {
    await channel.subscribe((status) => {
      console.log("Channel status:", status);
    });
  };
  subscribeChannel();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);


  return (
    <View className="flex flex-col justify-center items-center min-h-screen p-8 bg-white ">
      {/* Judul */}
      <View className="w-full max-w-md">
        <View className="w-full mb-6">
          <Text className="text-3xl font-extrabold text-black">Your To Do</Text>
        </View>
        
        {/* Input */}
        <View className="flex flex-row items-center mb-6">
          <TextInput
        className="border-b-2 border-black p-2 flex-grow focus:outline-none"
        placeholder="Tulis todo..."
        value={task}
        onChangeText={setTask}
      />

      {/* Tombol tambah */}
          <Pressable className="ml-4 bg-black text-white p-2 rounded-xl focus:outline-none" onPress={addTodo}>
            <Ionicons name="add" size={24} color="white" />
      </Pressable>
        </View>
      

      {/* List todo */}
      <FlatList
        className="mt-5 flex flex-col space-y-4"
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center mb-5 justify-between font-semibold text-black p-3 border border-gray-300 rounded-2xl">
            {/* Teks todo */}
                        <TouchableOpacity onPress={() => updateTodo(item.id, item.is_done)}>
              <View className="flex items-center ml-2 mr-3">
                <Ionicons name={item.is_done ? "checkbox" : "checkbox-outline"} size={24} color={item.is_done ? "black" : "gray"} />
              </View>
            </TouchableOpacity>
            
            <Text className={`text-lg flex-grow text-start ${item.is_done ? "line-through" : ""}`}>{item.title}</Text>


            {/* Tombol hapus */}
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        />
        </View>
    </View>
  );
}
