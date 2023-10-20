import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../../config/firebase";

import TopHeader from "../../components/home/topheader";
import Stories from "../../components/home/stories";
import Post from "../../components/home/post";

import { POSTS } from "../../consts/postData";

import BottomTab, { bottomTabIcons } from "../../components/home/bottomtab";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const user = getAuth().currentUser;

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const colRef = await collection(firestore, `users/${user.email}/posts`);
    const q = query(colRef, orderBy("createdAt", "desc"));
    await onSnapshot(colRef, (snapshot) => {
      setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
      console.log("POSTS ", posts);
    });
  };
  return (
    <View style={styles.container}>
      <TopHeader navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTab icons={bottomTabIcons} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default HomeScreen;
