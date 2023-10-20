import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { firebaseInit, firestore } from "../../config/firebase";

const SignupForm = ({ navigation }) => {
  const auth = getAuth(firebaseInit);

  const signupFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email required"),
    username: Yup.string().required().min(2, "An username required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 6 character"),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (email, password, username) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (authUser) => {
          const users = collection(firestore, "users");
          if (authUser) {
            console.log("Firebase User Created Successfully", email, password);
            await setDoc(doc(firestore, `users`, authUser.user.email), {
              owner_uid: authUser.user.uid,
              username: username,
              email: authUser.user.email,
              profile_picture: await getRandomProfilePicture(),
            });
          } else {
            console.log("Firebase User Created Failed");
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
            onSignup(values.email, values.password, values.username);
          }}
          validationSchema={signupFormSchema}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? "#ccc"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Phone number, username or email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      1 > values.username.length || values.username.length > 2
                        ? "#ccc"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Username"
                  autoCapitalize="none"
                  textContentType="username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      1 > values.password.length || values.password.length > 6
                        ? "#ccc"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>
              <Pressable
                style={styles.button(isValid)}
                disabled={!isValid}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}> Sign Up</Text>
              </Pressable>

              <View style={styles.signupContainer}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: "#6bb0f5" }}>Log In</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fafafa",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9acaf7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default SignupForm;
