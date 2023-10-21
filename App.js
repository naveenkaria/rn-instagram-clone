import "react-native-gesture-handler";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import Navigation from "./src/components/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.SafeAreaViewPadding}>
      <Navigation />
    </SafeAreaView>
  );
}
//Testing
const styles = StyleSheet.create({
  SafeAreaViewPadding: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
