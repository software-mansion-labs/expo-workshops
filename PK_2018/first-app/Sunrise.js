import React from "react";
import { Text, View } from "react-native";
import { Location, Permissions } from "expo";

export default class Sunrise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sun: null
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
    } else {
      const location = await Location.getCurrentPositionAsync({});
      const userCoords = location.coords;
      const rawResponse = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${userCoords.latitude}&lng=${userCoords.longitude}&date=today`
      );
      const response = await rawResponse.json();
      this.setState({ sun: response.results });
    }
  }

  render() {
    if (this.state.sun) {
      return (
        <View>
          <Text>Sunrise: {this.state.sun.sunrise}</Text>
          <Text>Sunset: {this.state.sun.sunset}</Text>
        </View>
      );
    }
    return <Text>Loading...</Text>;
  }
}
