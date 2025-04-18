// src/axios.js
import axios from 'axios'
import { Http } from '@capacitor-community/http'
import { Preferences } from '@capacitor/preferences';

// const instance = axios.create({
//     baseURL: 'http://your-api-domain.com/api',
// })

const api = axios.create({
    baseURL: 'https://staging-bsrs.tesda.gov.ph/api',
});

api.interceptors.request.use(async (config) => {
    const { value: token } = await Preferences.get({ key: 'token' });
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Wrapper function to use Capacitor HTTP plugin
const capacitorHttpRequest = async (method, url, data = {}, headers = {}) => {
    const { value: token } = await Preferences.get({ key: 'token' });
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await Http.request({
            method,
            url: `https://staging-bsrs.tesda.gov.ph/api${url}`, // Ensure the base URL is correct
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            params: {}, // Explicitly set params to avoid NullPointerException
            data,
        });

        return response; // Return the full response object
    } catch (error) {
        console.error("Capacitor HTTP Error:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

export { api, capacitorHttpRequest };