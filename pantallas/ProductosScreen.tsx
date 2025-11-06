import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Api, Producto } from "../servicio/ServicioProductos";

export default function ProductosScreen() {
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
            <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
              <Image source={{ uri: item.image }} style={styles.imagen} />
              <View style={{ flex: 1 }}>
                <Text style={styles.nombre}>{item.title}</Text>
                <Text style={styles.precio}>${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })}
      >
        <Text style={styles.botonVolverTexto}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e3e8ee",
  },
  imagen: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: "#e3e8ee",
    marginRight: 8,
  },
  nombre: {
    color: "#222e3a",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  precio: {
    color: "#3b82f6",
    fontSize: 15,
    fontWeight: "600",
  },
  cargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f9fc",
  },
  texto: {
    color: "#222e3a",
    marginTop: 10,
    fontSize: 16,
  },
  botonVolver: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignSelf: "center",
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#e3e8ee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
  },
  botonVolverTexto: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
