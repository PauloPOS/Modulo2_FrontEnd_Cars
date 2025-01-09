import axios from 'axios';
import { Carro } from '../../models/carro';

const API_URL = process.env.REACT_APP_API_URL;

class CarroService {
  serverPath = '/api/carros'; // Endpoint base para o backend

  // Salvar um novo carro
  save(carro: Carro) {
    return axios.post(`${API_URL}${this.serverPath}`, carro);
  }

  // Buscar carros paginados
  getAllPaginated(page: number, limit: number) {
    return axios.get(`${API_URL}${this.serverPath}`, {
      params: { page, size: limit },
    });
  }

  // Deletar um carro
  delete(id: number) {
    return axios.delete(`${API_URL}${this.serverPath}/${id}`);
  }

  // Buscar carro por ID
  getById(id: number) {
    return axios.get<Carro>(`${API_URL}${this.serverPath}/${id}`);
  }

  // Atualizar um carro
  update(id: number, carro: Carro) {
    return axios.put(`${API_URL}${this.serverPath}/${id}`, carro);
  }

  // Buscar carros por fabricante
  getFabricantes() {
    return axios.get(`${API_URL}${this.serverPath}/fabricante`);
  }

  // Buscar carros por fabricante específico
  searchByFabricante(fabricante: string) {
    return axios.get(`${API_URL}${this.serverPath}/search`, {
      params: { fabricante },
    });
  }
}

export default CarroService;
