import DefaultService from '../DefaultService';
import axios from 'axios';

// Declaração da constante API_URL usando variáveis de ambiente
const API_URL = process.env.REACT_APP_API_URL;

class CavalosService implements DefaultService {
  getAll() {
    return axios.get(`${API_URL}/api/carros`);
  }
}

export default CavalosService;
