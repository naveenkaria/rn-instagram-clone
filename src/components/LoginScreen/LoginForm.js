import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseInit from "../../config/firebase";

const LoginForm = ({ navigation }) => {
  const auth = getAuth(firebaseInit);

  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 6 character"),
  });

  const onLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Firebase Login Successfull");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode", errorCode);
          console.log("errorMessage", errorMessage);
          Alert.alert(error.message);
        });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
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
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#9acaf7" }}>Forgot Password?</Text>
            </View>
            <Pressable
              style={styles.button(isValid)}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}> Log In</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6bb0f5" }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
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

export default LoginForm;
