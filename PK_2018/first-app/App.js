import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Sunrise from './Sunrise';

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
          <Text>Hurray!</Text>
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
