import axios from 'axios';
import { THE_CAT_API_KEY } from '@env';


const BASE_URL = 'https://api.thecatapi.com/v1';

console.warn('THE_CAT_API_KEY:', THE_CAT_API_KEY);

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-api-key': THE_CAT_API_KEY,
        'Content-Type': 'application/json',
    },
});
