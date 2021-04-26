import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Button, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";

export default function AddCategoryScreen({ navigation }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [newCategory, setNewCategory] = useState([{ cName: "", cDesc: "" }]);

  const saveNewCategory = () => {
    let url = "https://organizerback.herokuapp.com/addCategory";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cName: name,
        cDesc: desc,
      }),
    }).then((response) => response.text());
    Alert.alert("Saved successfully!", "", [
      {
        text: "Ok",
        onPress: () => navigation.navigate("Categories"),
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
        <ThemeProvider theme={theme}>
          <Button
            icon={<Icon name="save" size={20} color="#000000" />}
            buttonStyle={{ backgroundColor: "#FFB8B4" }}
            title="Save"
            onPress={saveNewCategory}
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
