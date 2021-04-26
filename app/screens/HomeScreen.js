import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, ListItem, ThemeProvider, Card } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export default function HomeScreen({ navigation, route }) {
  const [boxes, setBoxes] = useState([]);
  const { user } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      getBoxes(user.userId);
    }, [])
  );

  useEffect(() => {
    getBoxes(user.userId);
  }, []);

  const getBoxes = (id) => {
    let url = "https://organizerback.herokuapp.com/boxes/" + id;
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
        setBoxes(data);
      });
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onLongPress={() => navigation.navigate("New item", { id: item.boxId })}
    >
      <ListItem.Content>
        <ListItem.Title>{item.bName}</ListItem.Title>
        <ListItem.Subtitle>{item.bDesc}</ListItem.Subtitle>
        <ListItem.Subtitle>Location: {item.bLocation}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron
        name="more-vertical"
        type="feather"
        color="#000000"
        onPress={() =>
          navigation.navigate("Items", {
            items: item.items,
            id: item.boxId,
            box: item,
            userId: user.userId,
          })
        }
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
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <Button
            icon={<Icon name="plus-square" size={25} />}
            buttonStyle={{ backgroundColor: "#FFB8B4" }}
            title="Add box"
            onPress={() =>
              navigation.navigate("New box", { userId: user.userId })
            }
          />
          <Button
            icon={<Icon name="info" size={25} />}
            buttonStyle={{ backgroundColor: "#FFB8B4" }}
            title="Categories"
            onPress={() => navigation.navigate("Categories")}
          />
        </ThemeProvider>
      </View>
      <View style={{ backgroundColor: "#FFE5E2", flex: 2, paddingTop: 1 }}>
        <Card containerStyle={{ padding: 5, marginBottom: 5, paddingTop: 5 }}>
          <Card.Title>Adding more items</Card.Title>
          <Text>Press long on the box you would like to add items to.</Text>
        </Card>
      </View>
      <View style={{ flex: 7, backgroundColor: "#FFFFFF", padding: 5 }}>
        <FlatList
          keyExtractor={keyExtractor}
          data={boxes}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: "#FFE5E2",
  },
});
