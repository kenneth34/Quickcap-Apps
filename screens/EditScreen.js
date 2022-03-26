import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function EditScreen({ navigation, route }) {
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  //const { id } = route.params;
  const notes = route.params?.post
  

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Text style={{ fontSize: 24 }}>Your Inputs</Text>
      <Text></Text>
      <TextInput
        style={styles.textInput}
        value={notes.title}
        editable={true}
        onChangeText={(input) => setText(input)}
      />
      <Text></Text>
      <TextInput
        style={styles.textInput}
        value={notes.content}
        editable={true}
        onChangeText={(input) => setContent(input)}
      />
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
      {/* <Text>{text.toUpperCase()}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});