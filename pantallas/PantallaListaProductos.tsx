import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Api, Producto } from "../servicio/Api";

export default function PantallaListaProductos() {
  const navigation = useNavigation<any>();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    const data = await Api.getProductos();
    setProductos(data);
    setCargando(false);
  };

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#b3c7ff" />
        <Text style={styles.texto}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Detalle", { id: item.id })}
          >
            <Text style={styles.nombre}>{item.title}</Text>
            <Text style={styles.precio}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1115",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  item: {
    backgroundColor: "#1a2738",
    padding: 18,
    borderRadius: 10,
    marginBottom: 10,
  },
  nombre: {
    color: "#eaeaea",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  precio: {
    color: "#b3c7ff",
    fontSize: 14,
    fontWeight: "500",
  },
  cargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f1115",
  },
  texto: {
    color: "#eaeaea",
    marginTop: 10,
  },
});
