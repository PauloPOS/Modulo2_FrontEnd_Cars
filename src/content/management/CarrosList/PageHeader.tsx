import { Button, Grid, Typography } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';

const PageHeader:React.FC = () =>{
  const navigate = useNavigate();

  return (

    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
         <Typography variant="h3" component="h3" gutterBottom>
           Carros Cadastrados
         </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={() => navigate("/management/new-carro")}
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
        Cadastrar Carro
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={() => navigate("/management/new-carro-validacao", {state:{mode:'create'}})}
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Cadastrar Usuario Com validacao
        </Button>
      </Grid>
    </Grid>
  );
}
export default PageHeader;