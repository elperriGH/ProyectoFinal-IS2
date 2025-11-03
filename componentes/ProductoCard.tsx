import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Producto } from "../servicio/Api";

export default function ProductCard({ item, onPress }: { item: Producto; onPress?: () => void }) {
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
    backgroundColor: "#181b22",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  image: { width: 64, height: 64, borderRadius: 8 },
  title: { color: "#eaeaea", fontSize: 15, fontWeight: "600" },
  price: { color: "#b3c7ff" },
});
