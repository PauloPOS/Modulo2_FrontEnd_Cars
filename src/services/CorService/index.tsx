import DefaultService from '../DefaultService';
import axios from 'axios';

class CorService implements DefaultService{
    getAll() {
        return Promise.resolve({
            data:[
              {value: "Preto", name: "Preto" },
              {value: "Branco", name: "Branco" },
              {value: "Prata", name: "Prata" },
              {value: 'unknown', name: "unknown"}
            ]
        })}
}
export default CorService;
