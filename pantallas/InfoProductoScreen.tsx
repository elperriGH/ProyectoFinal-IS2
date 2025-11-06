import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Api, Producto } from "../servicio/ServicioProductos";

export default function InfoProductoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { id } = route.params; // ID que recibimos desde la lista

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProducto();
  }, []);

  const cargarProducto = async () => {
    const data = await Api.getProductosPorId(id);
    setProducto(data);
    setCargando(false);
  };



  if (cargando || !producto) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#b3c7ff" />
        <Text style={styles.texto}>Cargando producto...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: producto.image }} style={styles.imagen} />

      <Text style={styles.titulo}>{producto.title}</Text>
      <Text style={styles.precio}>${producto.price}</Text>
      <Text style={styles.descripcion}>{producto.description}</Text>

      <TouchableOpacity
        style={styles.botonEditar}
        onPress={() => navigation.navigate("Modificar", { id: producto.id })}
      >
        <Text style={styles.botonTexto}>Editar producto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonEliminar}
        onPress={() => navigation.navigate("Borrar", { id: producto.id })}
>
        <Text style={styles.botonTexto}>Eliminar producto</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    padding: 28,
  },
  imagen: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 22,
    backgroundColor: "#e3e8ee",
    borderRadius: 16,
  },
  titulo: {
    color: "#222e3a",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  precio: {
    color: "#3b82f6",
    fontSize: 18,
    marginBottom: 16,
    fontWeight: "600",
  },
  descripcion: {
    color: "#222e3a",
    marginBottom: 32,
    fontSize: 16,
  },
  botonEditar: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#3b82f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 14,
    marginHorizontal: 20,
  },
  botonEliminar: {
    backgroundColor: "#f87171",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fee2e2",
    marginBottom: 14,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  botonTexto: {
    color: "#222e3a",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  cargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f9fc",
  },
  texto: {
    color: "#222e3a",
    marginTop: 12,
    fontSize: 16,
  },
});