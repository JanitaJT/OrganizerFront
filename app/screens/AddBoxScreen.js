import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Button, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";

export default function AddBoxScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const { userId } = route.params;

  const saveNewBox = () => {
    let url = "https://organizerback.herokuapp.com/addBoxes/" + userId;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bName: name,
        bDesc: desc,
        bLocation: location,
      }),
    }).then((response) => response.text());
    Alert.alert("Saved successfully!", "", [
      {
        text: "Ok",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
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
      <View style={styles.container}>
        <Input
          label="Name"
          placeholder="Name"
          onChangeText={(name) => setName(name)}
          value={name}
        />
        <Input
          label="Description"
          placeholder="Description"
          onChangeText={(desc) => setDesc(desc)}
          value={desc}
        />
        <Input
          label="Location"
          placeholder="Location"
          onChangeText={(location) => setLocation(location)}
          value={location}
        />
        <ThemeProvider theme={theme}>
          <Button
            icon={<Icon name="save" size={20} color="#000000" />}
            buttonStyle={{ backgroundColor: "#FFB8B4" }}
            title="Save"
            onPress={saveNewBox}
          />
        </ThemeProvider>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 5,
  },
});
