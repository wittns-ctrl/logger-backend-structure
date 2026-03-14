import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, 
});

// Interceptor to attach access token if we had it in memory.
// Our AuthContext will intercept requests and attach the token.
// Also intercepts 401s to attempt a refresh.

export default api;
