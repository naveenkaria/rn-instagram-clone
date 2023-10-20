import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/home--v1.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/500/ffffff/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel.png",
  },
  {
    name: "Shop",
    active:
      "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png",
  },
  {
    name: "Profile",
    active:
      "https://qph.cf2.quoracdn.net/main-qimg-6653979e5fcfc0c422aabf5a1a3879d2-pjlq",
    inactive:
      "https://qph.cf2.quoracdn.net/main-qimg-6653979e5fcfc0c422aabf5a1a3879d2-pjlq",
  },
];

const BottomTab = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const Icons = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab == icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icons,
          icon.name == "Profile" ? styles.profilePic() : null,
          activeTab == "Profile" && icon.name == activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icons key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // position: "absolute",
    width: "100%",
    // bottom: "3%",
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
  icons: {
    width: 30,
    height: 30,
  },
  profilePic: (active = "") => ({
    borderRadius: 50,
    borderWidth: active == "Profile" ? 2 : 0,
    borderColor: "#fff",
  }),
});

export default BottomTab;
