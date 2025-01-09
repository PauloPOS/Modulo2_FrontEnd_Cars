import DefaultService from '../DefaultService';

class QuantidadeService implements DefaultService {
    getAll() {
        return Promise.resolve({
          data:[
            { value: "0", name: "0" },
            { value: "9999", name: "9999" }
          ]
          }
        );
    }

}
export default QuantidadeService;