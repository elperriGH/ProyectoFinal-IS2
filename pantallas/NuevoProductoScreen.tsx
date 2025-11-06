import { useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Api } from "../servicio/ServicioProductos";

export default function NuevoProductoScreen() {
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://i.imgur.com/6M7ZtFv.png"); 

  const crear = async () => {
    if (!title || !price || !category || !description) {
      Alert.alert("Completa todos los campos");
      return;
    }

    await Api.crearProducto({
      title,
      price: Number(price),
      category,
      description,
      image,
    });

    Alert.alert("Producto creado con éxito");
    navigation.navigate("ListaProductos"); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Precio"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Categoría"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        placeholderTextColor="#888"
      />

      <Button title="Crear producto" onPress={crear} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    padding: 28,
    gap: 18,
  },
  input: {
    backgroundColor: "#fff",
    color: "#222e3a",
    borderWidth: 1,
    borderColor: "#e3e8ee",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
  },
});
