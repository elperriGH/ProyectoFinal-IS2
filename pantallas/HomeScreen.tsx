import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Proyecto Final</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ListaProductos")}
      >
        <Text style={styles.buttonText}>📦 Ver productos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Crear")}
      >
        <Text style={styles.buttonText}>➕ Crear producto</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1115",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 20,
  },
  title: {
    color: "#eaeaea",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#1a2738",
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
  },
  buttonText: {
    color: "#b3c7ff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});