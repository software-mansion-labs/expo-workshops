import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class App extends React.Component {
  state = {
    index: 3, // Next movie (0, 1, 2, -> 3 <-)
    list: [{
      key: 'aaaaaaa',
      value: 'asdfasfd'
    }, {
      key: 'bbbb',
      value: 'fsafdsa'
    }, {
      key: 'cc',
      value: 'fasfs'
    }],
    shouldDisplayForm: false,
    text: '',
  }

  onButtonPress = () => this.setState({ shouldDisplayForm: true });

  onChangeText = text => this.setState({ text });

  onMovieAdd = () => this.setState({
    index: this.state.index + 1,
    list: [
      {
        key: this.state.index + 1,
        value: this.state.text,
      },
      // Unpack array in place [{/* new one */}, list[0], list[1], ...]
      ...this.state.list,
    ],
    shouldDisplayForm: false,
    text: ''
  });

  keyExtractor = (item, index) => item.key + index;

  // Destructure object { item: {/* ... */}, /* ... */}
  // in this case: pick only item from it
  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.value}</Text>
    </View>
  );

  renderList = () => (
    <View style={styles.listBox}>
      <TouchableOpacity
        style={styles.button}
        onPress={this.onButtonPress}
      >
        <Text style={styles.buttonText}>Wyświetl mi forma!</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={this.state.list}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    </View>
  );

  renderForm = () => (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.input}
        onChangeText={this.onChangeText}
        value={this.state.text}
      />
      <TouchableOpacity
        style={styles.inputButton}
        onPress={this.onMovieAdd}
      >
        <Text style={styles.buttonText}>Dodaj film!</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { shouldDisplayForm } = this.state;
    return (
      <View style={styles.container}>
        {shouldDisplayForm
          ? this.renderForm()
          : this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
  },
  input: {
    backgroundColor: '#eee',
    height: 50,
    borderRadius: 5,
    fontSize: 18,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  inputButton: {
    backgroundColor: '#0ff0ff',
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  listBox: {
    paddingVertical: 50,
    width: '100%',
  },
  list: {
    marginTop: 30,
    width: '100%',
    height: '100%',
  },
  item: {
    width: '100%',
    backgroundColor: '#eee',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#fff000',
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
});
