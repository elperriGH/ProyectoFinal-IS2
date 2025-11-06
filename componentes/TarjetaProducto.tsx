import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Producto } from "../servicio/ServicioProductos";

export default function TarjetaProducto({ item, onPress }: { item: Producto; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f7f9fc",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e3e8ee",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#e3e8ee",
  },
  title: {
    color: "#222e3a",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  price: {
    color: "#3b82f6",
    fontSize: 15,
    fontWeight: "600",
  },
});
