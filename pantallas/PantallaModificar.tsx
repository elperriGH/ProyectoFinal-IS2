import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, ActivityIndicator, Button, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Api, Producto } from "../servicio/Api";

export default function PantallaModificar() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const { id } = route.params;

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    Api.getProductosPorId(id).then((data) => {
      setProducto(data);
      setCargando(false);
    });
  }, []);

  const guardarCambios = async () => {
    if (!producto) return;

    await Api.actualizarProducto(id, {
      title: producto.title,
      price: producto.price,
      description: producto.description,
      category: producto.category,

    });

    Alert.alert("✅ Producto modificado con éxito");
    navigation.navigate("Detalle", { id });
  };

  if (cargando || !producto) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#b3c7ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={producto.title}
        onChangeText={(t) => setProducto({ ...producto, title: t })}
        placeholder="Título"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={producto.price.toString()}
        onChangeText={(t) => setProducto({ ...producto, price: Number(t) })}
        placeholder="Precio"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={producto.description}
        onChangeText={(t) => setProducto({ ...producto, description: t })}
        placeholder="Descripción"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={producto.category}
        onChangeText={(t) => setProducto({ ...producto, category: t })}
        placeholder="Categoría"
        placeholderTextColor="#888"
       />

      <Button title="Guardar cambios ✏️" onPress={guardarCambios} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1115",
    padding: 20,
    gap: 15,
  },
  input: {
    backgroundColor: "#141820",
    color: "#eaeaea",
    borderWidth: 1,
    borderColor: "#2a2f3a",
    padding: 12,
    borderRadius: 10,
  },
  cargando: {
    flex: 1,
    backgroundColor: "#0f1115",
    justifyContent: "center",
    alignItems: "center",
  },
});