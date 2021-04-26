import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Button, ThemeProvider } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Feather";

export default function AddItemScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("");
  const { id } = route.params;

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    let url = "https://organizerback.herokuapp.com/categories";
    fetch(url, {
      method: "GET",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  };
  const saveNewItem = () => {
    let url = "https://organizerback.herokuapp.com/addItem/" + id;
    fetch(url, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iName: name,
        category: chosenCategory,
      }),
    }).then((response) => response.text());
    Alert.alert("Saved successfully!", " ", [
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
        <Picker
          selectedValue={chosenCategory}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => {
            setChosenCategory(itemValue);
          }}
        >
          {categories.map((category) => {
            return (
              <Picker.Item
                key={category.cateId}
                label={category.cName}
                value={category}
              />
            );
          })}
        </Picker>
        <ThemeProvider theme={theme}>
          <Button
            icon={<Icon name="save" size={20} color="#000000" />}
            buttonStyle={{ backgroundColor: "#FFB8B4" }}
            title="Save"
            onPress={saveNewItem}
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
