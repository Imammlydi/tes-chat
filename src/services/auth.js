import axios from 'axios';

const API_URL = 'http://192.168.1.35:8000/api';
// const API_URL = 'http://127.0.0.1:8000/api';

export const login = async (email, password) => {
    try {
        console.log('Login data:', { email, password });
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log('Login response:', response.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data.token;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        return null;
    }
};

export const register = async (name, email, password, passwordConfirmation) => {
    try {
        await axios.post(`${API_URL}/register`, {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });
        return true;
    } catch (error) {
        if (error.response && error.response.data.errors) {
            console.error('Validation Errors:', error.response.data.errors);
        } else {
            console.error(error);
        }
        return false;
    }
};
