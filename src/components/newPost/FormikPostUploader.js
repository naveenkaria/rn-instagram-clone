import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput } from "react-native";

import * as Yup from "yup";
import { Formik } from "formik";
import validUrl from "valid-url";

import { firestore } from "../../config/firebase";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  where,
  limit,
  query,
  setDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character"),
});

const PLACEHOLDER_IMG =
  "https://img.icons8.com/fluency-systems-regular/48/D3D3D3/picture.png";

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const user = getAuth().currentUser;

  useEffect(() => {
    firebaseQuery();
  }, []);

  const firebaseQuery = () => {
    const colRef = collection(firestore, "users");
    const q = query(colRef, where("email", "==", user.email), limit(1));
    onSnapshot(q, (snapshot) => {
      let array = [];
      snapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      setCurrentLoggedInUser({
        username: array[0].username,
        profile_picture: array[0].profile_picture,
      });
      console.log("SnapShot Data", array);
    });
  };

  const uploadPostToFirebase = async (imageUrl, caption) => {
    try {
      const docRef = doc(firestore, "users", user.email);
      const colRef = collection(docRef, "posts");
      await addDoc(colRef, {
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profile_picture,
        owner_uid: user.uid,
        owner_email: user.email,
        caption: caption,
        createdAt: serverTimestamp(),
        likes_by_users: [],
        comments: [],
      }).then(() => navigation.goBack());
    } catch (error) {
      console.log("uploadPostToFirebase", error);
    }
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                backgroundColor: validUrl.isUri(thumbnailUrl)
                  ? "transparent"
                  : "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: validUrl.isUri(thumbnailUrl)
                    ? thumbnailUrl
                    : PLACEHOLDER_IMG,
                }}
                style={
                  validUrl.isUri(thumbnailUrl)
                    ? { width: "100%", height: "100%" }
                    : { width: 30, height: 30 }
                }
              />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ color: "white", fontSize: 20 }}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <View
            style={{ width: "100%", height: 0.5, backgroundColor: "lightgray" }}
          />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: "white", fontSize: 18 }}
            placeholder="Enter Image Url"
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 12, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              onPress={handleSubmit}
              disabled={!isValid}
              style={{
                color: "lightblue",
                fontSize: 18,
                textAlign: "center",
                padding: 10,
              }}
            >
              Share
            </Text>
          </View>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
