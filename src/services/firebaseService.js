import { auth, firestore, storage } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Fungsi untuk pendaftaran pengguna
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Fungsi untuk login pengguna
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Fungsi untuk mendapatkan daftar kontak
export const getContacts = async (userId) => {
  try {
    const contactsQuery = query(collection(firestore, 'contacts'), where('userId', '==', userId));
    const contactsSnapshot = await getDocs(contactsQuery);
    return contactsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error getting contacts:", error);
    throw error;
  }
};

export const addContact = async (contactData) => {
    try {
        const contactsCollection = collection(firestore, 'contacts');
        await addDoc(contactsCollection, contactData);
        console.log('Contact added successfully!');
    } catch (error) {
        console.error('Error adding contact:', error);
    }
};

// Fungsi untuk mengirim pesan
export const sendMessage = async (chatId, message) => {
  try {
    await addDoc(collection(firestore, 'chats', chatId, 'messages'), message);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Fungsi untuk mengunggah file
export const uploadFile = async (uri, path) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, blob);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
