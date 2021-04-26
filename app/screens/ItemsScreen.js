import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { Button, ListItem, ThemeProvider } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export default function ItemsScreen({ navigation, route }) {
  const { id } = route.params;
  const { box } = route.params;
  const { userId } = route.params;
  const [allItems, setAllItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getItems(id);
    }, [])
  );

  useEffect(() => {
    getItems(id);
  }, []);

  const getItems = (id) => {
    let url = "https://organizerback.herokuapp.com/items/" + id;
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
        setAllItems(data);
      });
  };

  const deleteItem = (itemId) => {
    Alert.alert("Are you sure?", "This item will be deleted", [
      {
        text: "Yes",
        onPress: () => {
          console.log("Yes Pressed");
          let url = "https://organizerback.herokuapp.com/deleteItem/" + itemId;
          fetch(url, {
            method: "DELETE",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }).then((response) => {
            getItems(id);
          });
        },
      },
      {
        text: "No",
        onPress: () => console.log("No Pressed"),
        style: "cancel",
      },
    ]);
  };

  const deleteBox = () => {
    Alert.alert(
      "Are you sure?",
      "Deleting this box will also delete all items",
      [
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate("Home");
            let url = "https://organizerback.herokuapp.com/deleteBox/" + id;
            fetch(url, {
              method: "DELETE",
              mode: "no-cors",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
          },
        },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ]
    );
  };
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onLongPress={() => deleteItem(item.itemId)}>
      <ListItem.Content>
        <ListItem.Title>{item.iName}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron
        name="trash-2"
        type="feather"
        color="#FF0206"
        onPress={() => deleteItem(item.itemId)}
      ></ListItem.Chevron>
    </ListItem>
  );
  const theme = {
    Button: {
      titleStyle: {
        color: "black",
      },
    },
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 5, backgroundColor: "#FFFFFF" }}>
        <FlatList
          keyExtractor={keyExtractor}
          data={allItems}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <Button
            icon={<Icon name="trash-2" size={20} color="#000000" />}
            buttonStyle={{ backgroundColor: "#FF7A80" }}
            title="Delete box"
            onPress={deleteBox}
          />

          <Button
            icon={<Icon name="edit" size={20} color="#000000" />}
            buttonStyle={{ backgroundColor: "#FFB8B4" }}
            title="Edit box"
            onPress={() =>
              navigation.navigate("Edit box", {
                id: id,
                box: box,
                userId: userId,
              })
            }
          />
        </ThemeProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
});
