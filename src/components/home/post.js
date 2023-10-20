import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { firestore } from "../../config/firebase";
import { getAuth } from "firebase/auth";
import { updateDoc, arrayRemove, arrayUnion, doc } from "firebase/firestore";

const postFooterIcons = [
  {
    name: "like",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
    likedImageUrl: "https://img.icons8.com/ios-glyphs/90/fa314a/like--v1.png",
  },
  {
    name: "comment",
    imageUrl:
      "https://img.icons8.com/material-outlined/60/ffffff/speech-bubble--v1.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/sent--v1.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon--v1.png",
  },
];

const Post = ({ post }) => {
  const user = getAuth().currentUser;

  const handleLike = async (post) => {
    console.log(post.owner_email);
    const colRef = await doc(
      firestore,
      `users/${post.owner_email}/posts/${post.id}`
    );
    await updateDoc(colRef, {
      likes_by_users: !post.likes_by_users.includes(user.email)
        ? arrayUnion(user.email)
        : arrayRemove(user.email),
    })
      .then(() => {
        console.log("Document Successfully Updated");
      })
      .catch((error) => {
        console.log("Error Updating Document", error);
      });
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <View
        style={{ width: "100%", height: 0.5, backgroundColor: "lightgray" }}
      />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter handleLike={handleLike} post={post} user={user} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 5,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ height: 450, width: "100%" }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handleLike, post, user }) => (
  <View style={{ flexDirection: "row" }}>
    <View style={styles.leftFooterIconContainer}>
      {/* <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} /> */}
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: post.likes_by_users.includes(user.email)
              ? postFooterIcons[0].likedImageUrl
              : postFooterIcons[0].imageUrl,
          }}
        />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon
        imgStyle={[styles.footerIcon, styles.shareIcon]}
        imgUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "900" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "900" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post?.comments?.length > 0 && (
      <Text style={{ color: "gray" }}>
        View{post.comments.length > 1 ? " all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "900" }}>{comment.user}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
  shareIcon: {
    transform: [{ rotate: "320deg" }],
    marginTop: -3,
  },
});

export default Post;
