import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper'
;
import PageHeader from './PageHeader';
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, TextField } from '@mui/material';
import CarroService from '../../../services/CarroService';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

const CarroEditForm: React.FC = () => {
  const carroService = new CarroService();
  const { id } = useParams();
  const [idCarro, setIdCarro] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    id: 0,
    modelo: '',
    ano: '',
    cor: '',
    cavalosDePotencia: '',
    fabricante: '',
    pais_origem: '',
  });

  useEffect(() => {
    if (id) {
      carroService.getById(parseInt(id)).then((response) => {
        const carro = response.data;
        setIdCarro(carro.id);
        setFormData({
          id: carro.id,
          modelo: carro.modelo,
          ano: carro.ano,
          cor: carro.cor,
          cavalosDePotencia: carro.cavalosDePotencia,
          fabricante: carro.fabricante,
          pais_origem: carro.pais_origem,
        });
      });
    }
  }, [id]);

  const toastSucesso = () => toast.success('Carro atualizado com sucesso', { position: 'top-center' });
  const toastError = () => toast.error('Ops, algo de errado aconteceu.', { position: 'top-center' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'ano' || name === 'cavalosDePotencia' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (idCarro !== null) {
      carroService
        .update(idCarro, formData)
        .then(() => {
          toastSucesso();
        })
        .catch((error) => {
          console.error(error);
          toastError();
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Editar Carro</title>
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
                    fullWidth
                    required
                    id="fabricante"
                    label="Fabricante"
                    name="fabricante"
                    value={formData.fabricante}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    required
                    id="pais_origem"
                    label="País de Origem"
                    name="pais_origem"
                    value={formData.pais_origem}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    id="ano"
                    label="Ano"
                    name="ano"
                    type="string"
                    value={formData.ano}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    id="cor"
                    label="Cor"
                    name="cor"
                    value={formData.cor}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    required
                    id="cavalosDePotencia"
                    label="Cavalos de Potência"
                    name="cavalosDePotencia"
                    value={formData.cavalosDePotencia}
                    onChange={handleChange}
                  />

                  <Grid container spacing={3}>
                    <Grid sm item>
                      <Button type="submit" fullWidth variant="contained">
                        Salvar
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

export default CarroEditForm;
