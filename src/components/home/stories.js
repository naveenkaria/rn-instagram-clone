import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

import { USERS } from "../../consts/userData";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View
            key={index}
            style={{ alignItems: "center", marginHorizontal: 5 }}
          >
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text style={{ color: "white" }}>
              {story.name.length > 11
                ? story.name.slice(0, 10).toLowerCase() + "..."
                : story.name.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: "contain",
    marginLeft: 5,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});

export default Stories;
