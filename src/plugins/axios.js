import axios from 'axios'
axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3000/'
