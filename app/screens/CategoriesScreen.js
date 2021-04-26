import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Button, ListItem, ThemeProvider } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getCategories();
    }, [])
  );

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
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.cName}</ListItem.Title>
        <ListItem.Subtitle>{item.cDesc}</ListItem.Subtitle>
      </ListItem.Content>
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
          data={categories}
          renderItem={renderItem}
        />
        <View style={styles.container}>
          <ThemeProvider theme={theme}>
            <Button
              icon={<Icon name="plus-square" size={20} color="#000000" />}
              buttonStyle={{
                backgroundColor: "#FFB8B4",
                marginBottom: 20,
              }}
              title="Add category"
              onPress={() => navigation.navigate("New category")}
            />
          </ThemeProvider>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
