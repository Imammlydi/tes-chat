import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { firestore, auth } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ContactScreen = () => {
    const [contacts, setContacts] = useState([]);
    const navigation = useNavigation();
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const contactsCollection = collection(firestore, 'contacts');
                const contactsSnapshot = await getDocs(contactsCollection);
                const contactsList = contactsSnapshot.docs
                    .map(doc => doc.data())
                    .filter(contact => contact.userId !== currentUser.uid); // Filter kontak
                setContacts(contactsList);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    const handleContactPress = (contact) => {
        navigation.navigate('Chat', { contact }); // Pastikan nama screen dan parameter benar
    };

    const renderContact = ({ item }) => (
        <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item)}>
            <Text style={styles.contactText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderContact}
                contentContainerStyle={styles.contactList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contactList: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    contactItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    contactText: {
        fontSize: 18,
        color: '#333',
    },
});

export default ContactScreen;
