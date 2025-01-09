import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageHeader from './PageHeader';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import CarroService from '../../../services/CarroService';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface TypePayload {
  id: number;
  name: string;
}
const CarroFormValidacao: React.FC = () => {

interface IFormInput {
  modelo: string;
  ano: "";
  cor: "";
  cavalosDePotencia: "";
  fabricante: "";
  pais_origem: "";
}



  const schema = yup.object().shape({
    modelo: yup
      .string()
      .required('O modelo é obrigatório')
      .min(3, 'O modelo deve ter mais de 3 letras.')
      .max(50, 'O modelo deve ter até 50 letras.'),
      ano: yup
      .string()
      .typeError('O ano deve ser um número')
      .required('O ano é obrigatório')
      .min(1886, 'Ano inválido')
      .max(new Date().getFullYear(), 'O ano não pode ser maior que o atual'),
    cor: yup.string().required('A cor é obrigatória.'),
    cavalosDePotencia: yup
      .string()
      .typeError('Os cavalos de potência devem ser um número')
      .required('Os cavalos de potência são obrigatórios.'),
    fabricante: yup.string().required('O fabricante é obrigatório.'),
    pais_origem: yup.string().required('O país é obrigatório.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: yupResolver(schema)})

  
  const onSubmit = (data:IFormInput) =>{
    let usuarioService = new CarroService();
    console.log(data);
    usuarioService.save(formData).then((reponse =>{
      toastSucesso();
    })).catch((error) =>{
      toastError()
    })
  }
  const toastSucesso = () => toast.success("Usuario cadastrado com sucesso",{position: 'top-center'})
  const toastError = () => toast.error("Ops, algo de errado aconteceu.",{position: 'top-center'})
  const [formData, setFormData] = useState({
    id: 0,
    modelo: "",
    ano: "",
    cor: "",
    cavalosDePotencia: "",
    fabricante: "",
    pais_origem: ""
  })

  return (
    <>
      <Helmet>
        <title>Cadastro de Carro</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="stretch" spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Preencha o formulário" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    fullWidth
                    required
                    id="modelo"
                    label="Modelo"
                    {...register('modelo')}
                    error={!!errors.modelo}
                    helperText={errors.modelo?.message}
                  />

                  <TextField
                    fullWidth
                    required
                    id="ano"
                    label="Ano"
                    type="number"
                    {...register('ano')}
                    error={!!errors.ano}
                    helperText={errors.ano?.message}
                  />

                  <TextField
                    fullWidth
                    required
                    id="cor"
                    label="Cor"
                    {...register('cor')}
                    error={!!errors.cor}
                    helperText={errors.cor?.message}
                  />

                  <TextField
                    fullWidth
                    required
                    id="cavalosDePotencia"
                    label="Cavalos de Potência"
                    type="number"
                    {...register('cavalosDePotencia')}
                    error={!!errors.cavalosDePotencia}
                    helperText={errors.cavalosDePotencia?.message}
                  />

                  <TextField
                    fullWidth
                    required
                    id="fabricante"
                    label="Fabricante"
                    {...register('fabricante')}
                    error={!!errors.fabricante}
                    helperText={errors.fabricante?.message}
                  />

                  <TextField
                    fullWidth
                    required
                    id="pais_origem"
                    label="País"
                    {...register('pais_origem')}
                    error={!!errors.pais_origem}
                    helperText={errors.pais_origem?.message}
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

export default CarroFormValidacao;
