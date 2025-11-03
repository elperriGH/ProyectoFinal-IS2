import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Api } from "../servicio/Api";

export default function PantallaBorrar() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params;

  const eliminar = async () => {
    try {
      await Api.eliminarProducto(id);
      Alert.alert("✅ Producto eliminado correctamente");

      navigation.reset({
        index: 0,
        routes: [{ name: "ListaProductos" }],
      });
    } catch (error) {
      Alert.alert("❌ Error al eliminar el producto");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¿Seguro que deseas eliminar este producto?</Text>

      <Button title="Eliminar" color="#b80000" onPress={eliminar} />
      <View style={{ height: 12 }} />
      <Button title="Cancelar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1115",
    justifyContent: "center",
    padding: 24,
  },
  titulo: {
    color: "#eaeaea",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
});

