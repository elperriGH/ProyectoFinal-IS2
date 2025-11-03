import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Api, Producto } from "../servicio/Api";

export default function PantallaDetalle() {
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
        <Text style={styles.botonTexto}>✏️ Editar producto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonEliminar}
        onPress={() => navigation.navigate("Borrar", { id: producto.id })}
>
        <Text style={styles.botonTexto}>🗑️ Eliminar producto</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1115",
    padding: 20,
  },
  imagen: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  titulo: {
    color: "#eaeaea",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  precio: {
    color: "#b3c7ff",
    fontSize: 18,
    marginBottom: 15,
  },
  descripcion: {
    color: "#eaeaea",
    marginBottom: 30,
  },
  botonEditar: {
    backgroundColor: "#1a2738",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  botonEliminar: {
    backgroundColor: "#7b0000",
    padding: 15,
    borderRadius: 10,
  },
  botonTexto: {
    color: "#eaeaea",
    textAlign: "center",
    fontWeight: "600",
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