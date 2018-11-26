import React from "react";
import { Text } from "react-native";
import { Location, Permissions } from "expo";

export default class Sunrise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCoords: null
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
    } else {
      const userLocation = await Location.getCurrentPositionAsync({});
      this.setState({ userCoords: userLocation.coords });
    }
  }

  render() {
    if (this.state.userCoords) {
      return <Text>{this.state.userCoords.longitude} - {this.state.userCoords.latitude}</Text>;
    }
    return <Text>waiting...</Text>;
  }
}
