import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Input,
  Button,
  ThemeProvider,
  Card,
  Avatar,
  Image,
} from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";

export default function LogInScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const getUser = () => {
    let url = "https://organizerback.herokuapp.com/login";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: name,
        userPassword: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userId === null) {
          Alert.alert("Something went wrong!", "Try again", [
            {
              text: "Ok",
            },
          ]);
        } else {
          navigation.navigate("Home", { user: data });
        }
      });
  };
  const theme = {
    Button: {
      titleStyle: {
        color: "black",
      },
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#FFE5E2", flex: 2, paddingTop: 1 }}>
        <Avatar
          rounded
          source={{
            uri:
              "https://images.unsplash.com/photo-1573376670774-4427757f7963?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
          }}
          size={150}
          containerStyle={{ marginLeft: 110, marginTop: 10 }}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Username"
          placeholder="username"
          onChangeText={(name) => setName(name)}
          value={name}
        />
        <Input
          label="Password"
          placeholder="password"
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <ThemeProvider theme={theme}>
          <Button
            icon={<Icon name="save" size={20} color="#000000" />}
            buttonStyle={{ backgroundColor: "#FFB8B4" }}
            title="Login"
            onPress={() => getUser()}
          />
        </ThemeProvider>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 5,
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 5,
  },
});
