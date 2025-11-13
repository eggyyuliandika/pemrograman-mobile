import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Selamat Datang di Halaman Home</Text>
      <Text style={styles.subtitle}>
        Kamu berhasil login menggunakan Firebase Authentication!
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8FF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4A00E0",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4A00E0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
