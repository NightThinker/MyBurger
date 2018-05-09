import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-515fc.firebaseio.com/'
});

export default instance;