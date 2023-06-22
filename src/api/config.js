import axios from "axios";

const API_URL = 'https://pixabay.com/api';
export const API_KEY = '33876959-4544a41f90fb5decc9b2caff7';

const HTTPClient = axios.create({
  baseURL: API_URL,
});

export default HTTPClient;