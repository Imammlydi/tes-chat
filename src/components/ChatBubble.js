import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message, isSent }) => {
    return (
        <View style={[styles.container, isSent ? styles.sent : styles.received]}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    sent: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    received: {
        backgroundColor: '#FFF',
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    message: {
        fontSize: 16,
    },
});

export default ChatBubble;
