import { MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

interface DefaultSelectProps {
  name: string;
  value?: any;
  label: string;
  id: string;
  handlechange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  service: any;
  register?: any;
  control?: any; // Suporte ao react-hook-form
  errors?: any; // Exibir erros de validação (opcional)
}

const DefaultSelect: React.FC<DefaultSelectProps> = ({
  name,
  value,
  label,
  id,
  handlechange,
  service,
  register,
  control,
  errors,
}) => {
  const [values, setValues] = useState([]);

  // Carrega opções da API
  useEffect(() => {
    service.getAll().then((response) => {
      setValues(response.data);
    });
  }, [service]);

  // Suporte ao react-hook-form via `control`
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={value || ''}
        render={({ field }) => (
          <TextField
            id={id}
            select
            label={label}
            {...field} // Mapeia propriedades automaticamente
            error={!!errors}
            helperText={errors ? errors.message : ''}
          >
            {values.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    );
  }

  // Versão sem react-hook-form
  return (
    <TextField
      id={id}
      select
      label={label}
      name={name}
      value={value || ''}
      onChange={handlechange}
    >
      {values.map((option) => (
        <MenuItem key={option.name} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DefaultSelect;
