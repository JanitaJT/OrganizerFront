import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Button, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";

export default function EditBoxScreen({ route, navigation }) {
  const [name, setName] = useState(route.params.box.bName);
  const [desc, setDesc] = useState(route.params.box.bDesc);
  const [location, setLocation] = useState(route.params.box.bLocation);
  const { id } = route.params;
  const { userId } = route.params;

  const editBox = () => {
    let url = "https://organizerback.herokuapp.com/editBox/" + userId;
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boxId: id,
        bName: name,
        bDesc: desc,
        bLocation: location,
      }),
    });
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
            onPress={editBox}
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
