import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";
import { SwipeListView } from 'react-native-swipe-list-view';
import Basic from "../swipe/basic";

const db = firebase.firestore().collection("todos");

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  //firebase.firestore().collection("testing").add({
    //title: "Testing! Does this work???",
    //body: "This is to check the Integration is working",
    //potato: true,
    //question: "Why is there a potato bool here",
  //});

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#f55",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  
          useEffect(() => {
            const unsubscribe = db.onSnapshot((collection) => {
                const updatedNotes = collection.docs.map((doc) => {
        
                  const noteObject = {
                    ...doc.data(),
                    id: doc.id,
                  }
                  console.log(noteObject)
                  return noteObject
                });
                setNotes(updatedNotes)
              });
        
            return unsubscribe;
          }, []);
          

  function onRowOpen(rowKey, rowMap, toValue) {
  // Grab reference to this row
  const rowRef = rowMap[rowKey];
        
  // Do something with the row
  rowRef.closeRow();
  }

      
  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if (route.params?.text) {
      const newNote = {
        title: route.params.text,
        content: route.params.content,
        done: false,
        //id: notes.length.toString(),
      };

      db.add(newNote);
      //setNotes([...notes, newNote]);
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Screen");
  }

  // This deletes an individual note
  function deleteNote(id) {
    console.log("Deleting " + id);
    // To delete that item, we filter out the item we don't want
    //add firebase interaction
    db.doc(id).delete();
      
    //setNotes(notes.filter((item) => item.id !== id));
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <TouchableOpacity 
      onPress={() => navigation.navigate("Edit Screen", {post: item})}
      >
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "wrap",
          justifyContent: "space-between",
        }}
      >
        
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.title}</Text>
        <Text style={{  }}>{item.content}</Text>
        
        <TouchableOpacity 
          style={{ flexDirection: "row-reverse" }}
          onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={18} color="#944" />
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
    );
  }

  //const renderHiddenItem = (item, rowMap) => (
   // <View style={styles.rowBack}>
        
        //<TouchableOpacity
            //style={[styles.backRightBtn, styles.backRightBtnRight]}
            //onPress={() => deleteRow(rowMap, data.item.key)}
        //>
            //<Text style={styles.backTextWhite}>Delete</Text>
        //</TouchableOpacity>
    //</View>
//);

  

  return (
    <SwipeListView
    //<View style={styles.container}>
      
        data={notes}
        renderItem={renderItem}
        //renderHiddenItem={renderHiddenItem}
          
      //leftOpenValue={75}
      rightOpenValue={-75}
      onRowOpen={(rowKey, rowMap) => {
          setTimeout(() => {
              //rowMap[rowKey].closeRow()
          }, 2000)
      }}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    //</View>


    
    
    )}
    

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#cadff3",
    alignItems: "center",
    justifyContent: "center",
  },
  
});
