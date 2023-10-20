import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, Platform, StyleSheet } from "react-native";
import Navigation from "./src/components/navigation";

export default function App() {
  return (
    <SafeAreaView style={styles.SafeAreaViewPadding}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaViewPadding: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
