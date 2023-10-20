import React from "react";
import { View, StyleSheet, Image } from "react-native";
import LoginForm from "../../components/LoginScreen/LoginForm";

const INSTAGRAM_LOGO =
  "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-256.png";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image
          source={{ uri: INSTAGRAM_LOGO }}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default LoginScreen;
