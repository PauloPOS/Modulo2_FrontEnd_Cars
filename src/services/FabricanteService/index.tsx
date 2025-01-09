import DefaultService from '../DefaultService';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class FabricanteService implements DefaultService {
  getAll() {
    return axios.get(`${API_URL}/api/carros`);
  }
}

export default FabricanteService;
