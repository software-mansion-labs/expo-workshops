import React from "react";
import { Text } from "react-native";
import { Location, Permissions } from "expo";

export default class Sunrise extends React.Component {
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
    } else {
      const userLocation = await Location.getCurrentPositionAsync({});
      console.warn("location", userLocation);
    }
  }

  render() {
    return <Text>This is sample</Text>
  }
}
