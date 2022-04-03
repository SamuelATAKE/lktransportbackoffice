import axios from 'axios';

export default axios.create({
  baseURL: 'https://lktransportbackend.herokuapp.com',
  // baseURL: 'http://localhost:8080/',
  headers: {
    'Content-type': 'application/json'
  }
});
