import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteItemConfirmationModal from '../../../components/DeleteItemConfirmationModal';
import CarroService from '../../../services/CarroService';
import CarroModal from './CarroModal';
import { useNavigate } from 'react-router';
import SearchBar from '../../../components/SearchBar';
import toast from 'react-hot-toast';

const CarroTable: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const carroService = new CarroService();

  const [carros, setCarros] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Fetch cars with pagination
  const fetchCarros = (page: number, limit: number) => {
    carroService.getAllPaginated(page, limit).then((response) => {
      setTotal(parseInt(response.headers['x-total-count']));
      setCarros(response.data);
    });
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchCarros(newPage, limit);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setPage(0);
    fetchCarros(0, newLimit);
  };

  const handleDelete = (carro) => {
    setSelectedRow(carro);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmDelete = () => {
    carroService
      .delete(selectedRow.id)
      .then(() => {
        toast.success('Carro deletado com sucesso!', { position: 'top-center' });
        fetchCarros(page, limit);
        handleCloseDelete();
      })
      .catch(() => {
        toast.error('Erro ao deletar carro.', { position: 'top-center' });
        handleCloseDelete();
      });
  };

  const handleOpenProfile = (carro) => {
    setSelectedRow(carro);
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const openEditCarro = (carro) => {
    navigate(`/management/edit-carro/${carro.id}`, { state: { mode: 'update' } });
  };

  useEffect(() => {
    fetchCarros(page, limit);
  }, [page, limit]);

  return (
    <Card>
      <CardHeader title="Lista de Carros" />
      <SearchBar setCarros={setCarros} setTotal={setTotal} />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>|</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>|</TableCell>
              <TableCell>Ano</TableCell>
              <TableCell>|</TableCell>
              <TableCell>Cor</TableCell>
              <TableCell>|</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carros.map((carro) => (
              <TableRow hover key={carro.id}>
                <TableCell>{carro.id}</TableCell>
                <TableCell>|</TableCell>
                <TableCell>{carro.modelo}</TableCell>
                <TableCell>|</TableCell>
                <TableCell>{carro.ano}</TableCell>
                <TableCell>|</TableCell>
                <TableCell>{carro.cor}</TableCell>
                <TableCell>|</TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver Mais" arrow>
                    <IconButton
                      onClick={() => handleOpenProfile(carro)}
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter,
                        },
                        color: theme.palette.primary.main,
                      }}
                    >
                      <AddTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar Carro" arrow>
                    <IconButton
                      onClick={() => openEditCarro(carro)}
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter,
                        },
                        color: theme.palette.primary.main,
                      }}
                    >
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Deletar Carro" arrow>
                    <IconButton
                      onClick={() => handleDelete(carro)}
                      sx={{
                        '&:hover': {
                          background: theme.colors.error.lighter,
                        },
                        color: theme.palette.error.main,
                      }}
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={limit}
          onRowsPerPageChange={handleLimitChange}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Box>
      <DeleteItemConfirmationModal
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
      {showProfile && (
        <CarroModal carro={selectedRow} onClose={handleCloseProfile} />
      )}
    </Card>
  );
};

export default CarroTable;
