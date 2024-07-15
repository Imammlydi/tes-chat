import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, StyleSheet } from 'react-native';
import { firestore, auth, storage } from '../services/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export default function ChatScreen({ route }) {
  const { contact } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesQuery = query(
      collection(firestore, 'messages'),
      where('participants', 'array-contains', auth.currentUser.email),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    await addDoc(collection(firestore, 'messages'), {
      text: message,
      createdAt: new Date(),
      user: auth.currentUser.email,
      participants: [auth.currentUser.email, contact.email],
    });
    setMessage('');
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();

      const ref = storage.ref().child(`images/${Date.now()}`);
      await ref.put(blob);

      const url = await ref.getDownloadURL();
      await addDoc(collection(firestore, 'messages'), {
        imageUrl: url,
        createdAt: new Date(),
        user: auth.currentUser.email,
        participants: [auth.currentUser.email, contact.email],
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        inverted
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer, 
            item.user === auth.currentUser.email ? styles.messageOutgoing : styles.messageIncoming
          ]}>
            <View style={styles.bubble}>
              <Text style={styles.user}>{item.user}</Text>
              {item.text && <Text style={styles.text}>{item.text}</Text>}
              {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
            </View>
          </View>
        )}
      />
      <TextInput 
        placeholder="Message" 
        value={message} 
        onChangeText={setMessage} 
        style={styles.input} 
      />
      <View style={styles.buttonContainer}>
        <Button title="Send" onPress={handleSend} />
        <Button title="Pick Image" onPress={handlePickImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  messageContainer: {
    marginVertical: 10,
    maxWidth: '70%',
  },
  messageIncoming: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
  },
  messageOutgoing: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  bubble: {
    borderRadius: 20,
    padding: 10,
  },
  user: {
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
