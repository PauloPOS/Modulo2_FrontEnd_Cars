import { Button, MenuItem, styled, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import CarroService from '../../services/CarroService';

// Estilização do contêiner
const SearchContainer = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 1px;
  margin-bottom: 10px;
  padding: 20px;
  width: 100%;
`;

// Estilização do campo de texto
const StyledTextField = styled(TextField)`
  width: 100%;
  max-width: 200px;
  margin: 0 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  .MuiInputBase-root {
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .MuiOutlinedInput-root.Mui-focused fieldset {
    border-color: #3f51b5;
  }

  input {
    font-size: 16px;
    color: #333;
  }
`;

// Estilização do botão de buscar
const SubmitButton = styled(Button)`
  margin-left: 10px;
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #303f9f;
  }
`;

const SearchBar = ({ setCarros, setTotal }) => {
  const [fabricantes, setFabricantes] = useState([]); // Lista de fabricantes
  const [fabricanteSelecionado, setFabricanteSelecionado] = useState(''); // Fabricante selecionado

  // Carregar fabricantes ao montar o componente
  useEffect(() => {
    const carroService = new CarroService();
    carroService
      .getFabricantes()
      .then((response) => {
        setFabricantes(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar fabricantes:', error);
      });
  }, []);

  // Atualiza o fabricante selecionado
  const handleChange = (event) => {
    setFabricanteSelecionado(event.target.value);
  };

  // Submete o formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fabricanteSelecionado) {
      alert('Por favor, selecione um fabricante.');
      return;
    }

    const carroService = new CarroService();
    carroService
      .searchByFabricante(fabricanteSelecionado)
      .then((response) => {
        setCarros(response.data);
        setTotal(response.data.length);
      })
      .catch((error) => {
        console.error('Erro ao buscar carros:', error);
      });
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <StyledTextField
          select
          label="Fabricante"
          value={fabricanteSelecionado}
          onChange={handleChange}
        >
          {fabricantes.map((fabricante) => (
            <MenuItem key={fabricante} value={fabricante}>
              {fabricante}
            </MenuItem>
          ))}
        </StyledTextField>
        <SubmitButton variant="contained" type="submit">
          Buscar
        </SubmitButton>
      </form>
    </SearchContainer>
  );
};

export default SearchBar;
