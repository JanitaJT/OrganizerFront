import React from "react";
import AddBoxScreen from "./app/screens/AddBoxScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsScreen from "./app/screens/ItemsScreen";
import AddItemScreen from "./app/screens/AddItemScreen";
import CategoriesScreen from "./app/screens/CategoriesScreen";
import AddCategoryScreen from "./app/screens/AddCategoryScreen";
import EditBoxScreen from "./app/screens/EditBoxScreen";
import LogInScreen from "./app/screens/LogInScreen";

export default function App({ navigation }) {
  const Tab = createStackNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFB8B4",
          },
        }}
      >
        <Tab.Screen
          name="Login"
          component={LogInScreen}
          options={{ headerTitleAlign: "center" }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitleAlign: "center" }}
        />

        <Tab.Screen
          name="New box"
          component={AddBoxScreen}
          options={{ headerTitleAlign: "center" }}
        />
        <Tab.Screen
          name="Items"
          component={ItemsScreen}
          options={{ headerTitleAlign: "center" }}
        />
        <Tab.Screen
          name="New item"
          component={AddItemScreen}
          options={{ headerTitleAlign: "center" }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ headerTitleAlign: "center" }}
        />
        <Tab.Screen name="New category" component={AddCategoryScreen} />
        <Tab.Screen
          name="Edit box"
          component={EditBoxScreen}
          options={{ headerTitleAlign: "center" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
