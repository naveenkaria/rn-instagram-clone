import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const TopHeader = ({ navigation }) => {
  const auth = getAuth();
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("signed out successfully");
    } catch (error) {
      console.log("signout error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  iconContainer: {
    flexDirection: "row",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 23,
    bottom: 18,
    width: 20,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },
});

export default TopHeader;
