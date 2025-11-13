import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { AntDesign } from "@expo/vector-icons";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./firebaseAuth"; // pakai file baru, bukan firebaseConfig

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  // === KONFIGURASI GOOGLE LOGIN ===
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        const credential = GoogleAuthProvider.credential(
          null,
          authentication.accessToken
        );
        signInWithCredential(auth, credential)
          .then((result) => {
            Alert.alert("Login Success", `Welcome ${result.user.displayName}!`);
          })
          .catch((error) => {
            Alert.alert("Login Failed", error.message);
          });
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      {/* === Title === */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Enter your email and password to access your account.
      </Text>

      {/* === Input Email === */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="sellostore@company.com"
          placeholderTextColor="#999"
        />
      </View>

      {/* === Input Password === */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="5ellostore."
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>

      {/* === Remember & Forgot === */}
      <View style={styles.rowBetween}>
        <View style={styles.row}>
          <View style={styles.checkbox} />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Your Password?</Text>
        </TouchableOpacity>
      </View>

      {/* === Login Button === */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      {/* === Divider === */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Login With</Text>
        <View style={styles.line} />
      </View>

      {/* === Google Button === */}
      <TouchableOpacity
        style={styles.googleButton}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <AntDesign
          name="google"
          size={20}
          color="#000"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.googleText}>Google</Text>
      </TouchableOpacity>

      {/* === Footer === */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t Have An Account?</Text>
        <TouchableOpacity>
          <Text style={styles.registerText}> Register Now.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// === STYLE ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 28,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#000",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 3,
    marginRight: 8,
  },
  rememberText: {
    color: "#555",
    fontSize: 13,
  },
  forgotText: {
    color: "#3B82F6",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 13,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    elevation: 2,
  },
  googleText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  footerText: {
    color: "#555",
    fontSize: 13,
  },
  registerText: {
    color: "#3B82F6",
    fontSize: 13,
  },
});
