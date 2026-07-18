import axios, { AxiosError } from 'axios';

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
const TMDB_API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.themoviedb.org/3';

export const tmdbClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure Authentication Interceptor
tmdbClient.interceptors.request.use(
  (config) => {
    // If bearer token is provided, prioritize it
    if (TMDB_ACCESS_TOKEN && TMDB_ACCESS_TOKEN !== 'YOUR_ACCESS_TOKEN') {
      config.headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN}`;
    } 
    // Fall back to API Key if bearer token is not present
    else if (TMDB_API_KEY && TMDB_API_KEY !== 'YOUR_API_KEY') {
      config.params = {
        ...config.params,
        api_key: TMDB_API_KEY,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Configure Response interceptor for unified error logging
tmdbClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('TMDB API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);
