import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Sunrise from "./Sunrise";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({ isClicked: true })}>
          <Image source={require("./assets/icon.png")} />
          <Text>Click Me!</Text>
        </TouchableOpacity>
        {this.state.isClicked && <Sunrise />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
