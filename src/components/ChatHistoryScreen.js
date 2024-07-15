import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firestore, auth } from '../services/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ChatHistoryScreen = () => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const historyQuery = query(
          collection(firestore, 'messages'),
          where('participants', 'array-contains', auth.currentUser.email),
          orderBy('createdAt', 'desc')
        );
        const historySnapshot = await getDocs(historyQuery);
        const historyList = historySnapshot.docs.map(doc => doc.data());
        setChatHistory(historyList);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <View style={styles.container}>
      {chatHistory.map((message, index) => (
        <View key={index} style={styles.messageContainer}>
          <Text>{message.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
  },
});

export default ChatHistoryScreen;
