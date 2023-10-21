import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import SignupForm from "../../components/signupScreen/SignupForm";

const INSTAGRAM_LOGO =
  "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-256.png";

const SignupScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            source={{ uri: INSTAGRAM_LOGO }}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <SignupForm navigation={navigation} />
      </View>
    </ScrollView>
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

export default SignupScreen;
