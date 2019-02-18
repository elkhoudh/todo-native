import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Button
} from "react-native";
import axios from "axios";

const URL = "https://todo-hamza.herokuapp.com/api/todos";

export default class App extends React.Component {
  state = {
    task: "",
    todos: []
  };

  componentDidMount = () => {
    axios
      .get(URL)
      .then(res => this.setState({ todos: res.data }))
      .catch(err => alert(err));
  };

  addTodo = () => {
    axios
      .post(URL, this.state)
      .then(res => this.setState({ todos: res.data, task: "" }))
      .catch(err => alert(err));
  };

  markCompleted = (id, completed) => {
    if (completed) {
      axios
        .put(`${URL}/${id}`, { completed: 0 })
        .then(res => this.setState({ todos: res.data }))
        .catch(err => alert(err));
    } else {
      axios
        .put(`${URL}/${id}`, { completed: 1 })
        .then(res => this.setState({ todos: res.data }))
        .catch(err => alert(err));
    }
  };

  clearCompleted = () => {
    axios
      .post(`${URL}/completed`)
      .then(res => this.setState({ todos: res.data }))
      .catch(err => alert(err));
  };

  render() {
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="Type your todo..."
          onChangeText={task => this.setState({ task })}
          value={this.state.task}
        />
        <Button onPress={this.addTodo} title="Add todo" color="#841584" />
        <Button
          onPress={this.clearCompleted}
          title="Clear Completed"
          color="#841584"
        />
        <ScrollView>
          {this.state.todos &&
            this.state.todos.map(todo => (
              <Text
                key={todo.id}
                style={
                  todo.completed
                    ? {
                        textDecorationLine: "line-through",
                        padding: 10,
                        fontSize: 42
                      }
                    : { padding: 10, fontSize: 42 }
                }
                onPress={() => this.markCompleted(todo.id, todo.completed)}
              >
                {todo.task}
              </Text>
            ))}
        </ScrollView>
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
  },
  input: {
    padding: 40
  }
});
