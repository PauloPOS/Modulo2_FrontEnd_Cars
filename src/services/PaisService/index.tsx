import axios from 'axios';
import DefaultService from '../DefaultService';

const API_URL = process.env.REACT_APP_API_URL;

class PaisService implements DefaultService {
  getAll() {
    return axios.get(`${API_URL}/api/pais_origem`);
  }
}

export default PaisService;
