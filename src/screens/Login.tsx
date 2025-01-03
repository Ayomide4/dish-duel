import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  bg,
  gray,
  lightBackground,
  secondary,
  text,
} from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import Google from "../../assets/svg/google";
import Eye from "../../assets/svg/eye";
import { signIn } from "../api";

interface UserLogin {
  email: string;
  password: string;
}

export default function Login({ navigation }: any) {
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleState = (property: keyof UserLogin, value: string) => {
    setUserLogin((prev: UserLogin) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleSubmit = async (userLogin: UserLogin) => {
    const user = await signIn(userLogin);
    if (user) {
      console.log(user);
      navigation.navigate("Party");
    }
  };

  //TODO: validate user and pass

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <Text
          style={{
            color: text,
            fontSize: 36,
            position: "absolute",
            top: 70,
            left: 30,
          }}
        >
          Sign In
        </Text>
        <View style={styles.contentContainer}>
          <View style={styles.loginForm}>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}
              >
                Welcome Back!
              </Text>
              <Text>To participate in the event, please log in.</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={[styles.input, { marginBottom: 10 }]}
                placeholder="Email Address"
                placeholderTextColor="black"
                autoComplete="email"
                autoCapitalize="none"
                inputMode="email"
                value={userLogin.email}
                onChangeText={(text) => handleState("email", text)}
                spellCheck={false}
              />
              <View style={{ position: "relative" }}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="black"
                  autoComplete="password"
                  autoCapitalize="none"
                  inputMode="text"
                  secureTextEntry={!isPasswordVisible}
                  value={userLogin.password}
                  onChangeText={(text) => handleState("password", text)}
                />
                <Pressable
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 7,
                  }}
                >
                  <Eye />
                </Pressable>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,

                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    backgroundColor: gray,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                />
                <Text>Remember Me</Text>
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Forgot Password?
              </Text>
            </View>

            <Pressable
              onPress={() => handleSubmit(userLogin)}
              style={{
                width: "100%",
                height: 40,
                backgroundColor: secondary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: lightBackground, fontSize: 16 }}>
                Sign In
              </Text>
            </Pressable>
          </View>

          <View style={styles.bottomSection}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "row",
                width: "100%",
                marginBottom: 50,
              }}
            >
              <View
                style={{ height: 2, width: "25%", backgroundColor: gray }}
              />
              <Text>OR CONTINUE WITH</Text>
              <View
                style={{ height: 2, width: "25%", backgroundColor: gray }}
              />
            </View>
            <View style={{ alignItems: "center", width: "100%" }}>
              <Pressable
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  borderColor: gray,
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  flexDirection: "row",
                }}
              >
                <View style={{ marginRight: 10 }}>
                  <Google />
                </View>
                <Text>Sign in with Google</Text>
                {/*add firebase auth*/}
              </Pressable>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                  Don't have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      textDecorationLine: "underline",
                    }}
                  >
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: bg,
    flex: 1,
    position: "relative",
  },
  contentContainer: {
    backgroundColor: lightBackground,
    height: "90%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: "center",
    padding: 30,
    justifyContent: "space-evenly",
  },
  loginForm: {
    width: "100%",
    marginBottom: 80,
  },
  bottomSection: {
    alignItems: "center",
    width: "100%",
    height: 200,
  },
  input: {
    backgroundColor: gray,
    padding: 10,
    borderRadius: 5,
  },
});
