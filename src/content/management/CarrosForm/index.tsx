import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageHeader from './PageHeader';
import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import CarroService from '../../../services/CarroService';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Carro {
  id: number;
  modelo: string;
  ano: string;
  cor: string;
  cavalosDePotencia: string;
  fabricante: string;
  pais_origem: string;
}

interface Option {
  id: number;
  name: string;
}

const API_URL = process.env.REACT_APP_API_URL;

const CarroForm: React.FC = () => {
  const [formData, setFormData] = useState<Carro>({
    id: 0,
    modelo: '',
    ano: '',
    cor: '',
    cavalosDePotencia: '',
    fabricante: '',
    pais_origem: '',
  });

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/types`, {
          params: { type: inputValue },
        });
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    if (inputValue.length >= 5) {
      fetchOptions();
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  const toastSucesso = () =>
    toast.success('Carro cadastrado com sucesso', { position: 'top-center' });
  const toastError = () =>
    toast.error('Ops, algo de errado aconteceu.', { position: 'top-center' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'ano' || name === 'cavalosDePotencia' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const carroService = new CarroService();

    carroService
      .save(formData)
      .then(() => {
        toastSucesso();
        setFormData({
          id: 0,
          modelo: '',
          ano: '',
          cor: '',
          cavalosDePotencia: '',
          fabricante: '',
          pais_origem: '',
        });
      })
      .catch((error) => {
        console.error(error);
        toastError();
      });
  };

  return (
    <>
      <Helmet>
        <title>Cadastro de Carro</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Preencha o formulário" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      fullWidth
                      required
                      id="modelo"
                      label="Modelo"
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                    />

                    <TextField
                      id="fabricante"
                      label="Fabricante"
                      name="fabricante"
                      value={formData.fabricante}
                      onChange={handleChange}
                      fullWidth
                      required
                    />

                    <TextField
                      id="ano"
                      label="Ano"
                      name="ano"
                      type="number"
                      value={formData.ano}
                      onChange={handleChange}
                      fullWidth
                      required
                    />

                    <TextField
                      id="cor"
                      label="Cor"
                      name="cor"
                      value={formData.cor}
                      onChange={handleChange}
                      fullWidth
                      required
                    />

                    <TextField
                      id="cavalosDePotencia"
                      label="Cavalos de Potência"
                      name="cavalosDePotencia"
                      type="number"
                      value={formData.cavalosDePotencia}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </div>

                  <Autocomplete
                    id="type"
                    value={null}
                    onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                    inputValue={inputValue}
                    options={options}
                    getOptionLabel={(option) => option['name']}
                    noOptionsText="Nenhuma opção encontrada"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Selecione uma opção"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>,
                        }}
                      />
                    )}
                  />

                  <Grid container spacing={3}>
                    <Grid sm item>
                      <Button type="submit" fullWidth variant="contained">
                        Cadastrar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CarroForm;
