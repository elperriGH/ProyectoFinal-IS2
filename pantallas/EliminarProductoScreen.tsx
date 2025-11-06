import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Api } from '../servicio/ServicioProductos';

export default function EliminarProductoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params;

  const eliminar = async () => {
    try {
      await Api.eliminarProducto(id);
      Alert.alert("Producto eliminado correctamente");

      navigation.reset({
        index: 0,
        routes: [{ name: "ListaProductos" }],
      });
    } catch (error) {
      Alert.alert("Error al eliminar el producto");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¿Seguro que deseas eliminar este producto?</Text>

      <TouchableOpacity style={styles.botonEliminar} onPress={eliminar}>
        <Text style={styles.botonTexto}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonCancelar} onPress={() => navigation.goBack()}>
        <Text style={[styles.botonTexto, { color: '#666' }]}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    padding: 28,
  },
  titulo: {
    color: "#222e3a",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 32,
    fontWeight: "700",
  },
  botonEliminar: {
    backgroundColor: "#b80000",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: 20,
  },
  botonCancelar: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 20,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});

