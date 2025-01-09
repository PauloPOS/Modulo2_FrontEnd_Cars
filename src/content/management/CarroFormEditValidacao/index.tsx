import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageHeader from './PageHeader';
import React, { useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, TextField } from '@mui/material';
import CarroService from '../../../services/CarroService';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router';
import DefaultController from '../../../components/DefaultController';
import PaisService from '../../../services/PaisService';
import FabricanteService from '../../../services/FabricanteService';
import CavalosService from 'src/services/CavalosService';
import CorService from '../../../services/CorService';

const CarroFormEditValidacao: React.FC = () => {
  const carroService = new CarroService();
  const { id } = useParams();

  useEffect(() => {
    carroService.getById(parseInt(id)).then((response) => {
      const carro = response.data;
      setValue("modelo", carro.modelo || "", { shouldTouch: true })
      setValue("ano",String (carro.ano) || "", { shouldTouch: true })
      setValue("cor", carro.cor || "", { shouldTouch: true })
      setValue("cavalosDePotencia", carro.cavalosDePotencia || '', { shouldTouch: true })
      setValue("fabricante", carro.fabricante || "", { shouldTouch: true })
      setValue("pais_origem", carro.pais_origem || "", { shouldTouch: true })
    });
  }, [id]);
  
  

  interface IFormInput {
    id: 0;
    modelo: string;
    ano: "";
    cor: ""; // Alterado para string para compatibilidade
    cavalosDePotencia: "";
    fabricante: "";
    pais_origem: "";
  }
  const schema = yup.object().shape({
    modelo: yup
      .string()
      .required("O nome do carro é obrigatório")
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .max(20, "O nome pode ter até 20 caracteres"),
    ano: yup
      .string()
      .typeError("O ano deve ser um número")
      .required("O aao é obrigatório"),
    cor: yup
      .string()
      .typeError("A cor deve ter pelo menos 3 caracteres")
      .required("A cor  é obrigatória"),
    cavalosDePotencia: yup.string().required("A categoria é obrigatória"),
    fabricante: yup.string().required("O fornecedor é obrigatório"),
    pais_origem: yup.string().required("O país de origem é obrigatório"),
  });
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
   } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      modelo: '',
      ano: '',
      cor: '',
      cavalosDePotencia: '',
      fabricante: '',
      pais_origem: '',
    },
  });
  
  
  const onSubmit = (data: IFormInput) => {
    carroService
      .update(parseInt(id), data)
      .then(() => {
        toast.success('Carro editado com sucesso!', { position: 'top-center' });
      })
      .catch(() => {
        toast.error('Ops, algo deu errado.', { position: 'top-center' });
      });
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
              <CardHeader title="Editar Carro" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                 <Grid container spacing={3}>
  <Grid item>
    <TextField
      fullWidth
      required
      id="modelo"
      label="Modelo"
      {...register("modelo")}
      error={!!errors.modelo}
      helperText={errors.modelo?.message}
    />
  </Grid>

  <Grid item>
  <TextField
      fullWidth
      required
      name="fabricante"
      label="Fabricante"
      id="fabricante"
      {...register("fabricante")}
      error={!!errors.fabricante}
      helperText={errors.fabricante?.message}
    />
  </Grid>

  <Grid item>
  <TextField
      fullWidth
      required
      name="pais_origem"
      label="País de Origem"
      id="pais_origem"
      {...register("pais_origem")}
      error={!!errors.pais_origem}
      helperText={errors.pais_origem?.message}
    />
  </Grid>
</Grid>

<Grid container spacing={3}>
  <Grid item>
    <TextField
      fullWidth
      id="ano"
      label="Ano"
      {...register("ano")}
      error={!!errors.ano}
      helperText={errors.ano?.message}
    />
  </Grid>

  <Grid item>
    <TextField
      fullWidth
      name="cor"
      label="Cor"
      id="cor"
      {...register("cor")}
      error={!!errors.cor}
      helperText={errors.cor?.message}
    />
  </Grid>

  <Grid item>
    <TextField
      fullWidth
      required
      label="Cavalos de Potência"
      id="cavalosDePotencia"
      {...register("cavalosDePotencia")}
      error={!!errors.cavalosDePotencia}
      helperText={errors.cavalosDePotencia?.message} 
    />


  </Grid>
</Grid>

                  <Grid container spacing={3}>
                    <Grid sm item>
                      <Button type="submit" fullWidth variant="contained">
                        Editar
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
export default CarroFormEditValidacao;
