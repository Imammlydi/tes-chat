// import axios from 'axios';

// // const API_URL = 'http://127.0.0.1:8000/api';
// const API_URL = 'http://192.168.1.35:8000/api';


// export const getConversations = async () => {
//     const response = await axios.get(`${API_URL}/conversations`);
//     return response.data;
// };

// export const getMessages = async (conversationId) => {
//     const response = await axios.get(`${API_URL}/conversations/${conversationId}`);
//     return response.data;
// };

// export const sendMessage = async (conversationId, message) => {
//     const response = await axios.post(`${API_URL}/messages`, {
//         conversation_id: conversationId,
//         message: message,
//     });
//     return response.data;
// };


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.35:8000/api';

export const getConversations = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken'); // Ambil token dari AsyncStorage
        const response = await axios.get(`${API_URL}/conversations`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Fetched conversations successfully:', response.data.contacts); // Log untuk respons berhasil
        return response.data.contacts || []; // Mengembalikan daftar percakapan
    } catch (error) {
        if (error.response) {
            console.error('Failed to fetch conversations - response error:', error.response.data);
        } else if (error.request) {
            console.error('Failed to fetch conversations - request error:', error.request);
        } else {
            console.error('Failed to fetch conversations - other error:', error.message);
        }
        return [];
    }
};



// export const sendMessage = async (conversationId, message) => {
//     try {
//         const token = await AsyncStorage.getItem('userToken'); // Ambil token dari AsyncStorage
//         console.log('Token:', token);
//         console.log('Sending message to:', `${API_URL}/messages`);
//         console.log('Data:', { conversation_id: conversationId, message });

//         const response = await axios.post(`${API_URL}/messages`, {
//             conversation_id: conversationId,
//             message: message,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('Message sent successfully:', response.data); // Log untuk respons berhasil
//         return response.data;
//     } catch (error) {
//         if (error.response) {
//             console.error('Failed to send message - response error:', error.response.data);
//         } else if (error.request) {
//             console.error('Failed to send message - request error:', error.request);
//         } else {
//             console.error('Failed to send message - other error:', error.message);
//         }
//     }
// };


export const sendMessage = async (conversationId, message, receiverId) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post(`${API_URL}/messages`, {
            conversation_id: conversationId,
            message: message,
            receiver_id: receiverId, // tambahkan receiver_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        // handle errors
    }
};


export const getMessages = async (conversationId) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${API_URL}/conversations/${conversationId}/messages`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Fetched messages response:', response.data); // Logging respons
        return response.data.messages || [];
    } catch (error) {
        console.error('Failed to fetch messages:', error.response || error.message);
        return [];
    }
};

export const startConversation = async (contactId) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post(`${API_URL}/conversations/start`, {
            contact_id: contactId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Mengembalikan percakapan yang baru dibuat atau ditemukan
    } catch (error) {
        if (error.response) {
            console.error('Failed to start conversation - response error:', error.response.data);
        } else if (error.request) {
            console.error('Failed to start conversation - request error:', error.request);
        } else {
            console.error('Failed to start conversation - other error:', error.message);
        }
    }
};