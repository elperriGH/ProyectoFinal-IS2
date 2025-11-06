import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function InicioScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>IS2 TP2: Consumo de APIS</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ListaProductos")}
      >
        <Text style={styles.buttonText}>Ver productos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Crear")}
      >
        <Text style={styles.buttonText}>Crear producto</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 24,
  },
  title: {
    color: "#222e3a",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 44,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: "90%",
    borderWidth: 2,
    borderColor: "#3b82f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ scale: 1.02 }],
  },
  buttonText: {
    color: "#3b82f6",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});