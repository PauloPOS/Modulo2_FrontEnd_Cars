import { MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import LocationsService from '../../services/PaisService';

const LocationsSelect = ({name,value,handleChange,register}) =>{
  const [locations, setLocations] = useState([])
  const locationService = new LocationsService();
  useEffect(() => {
    locationService.getAll()
      .then((response) =>{
          setLocations(response.data)
    })
  }, []);
  return <TextField
    id="locations"
    select
    label = "Locations"
    {...register('location')}
    name={name}
    value={value}
    onChange={handleChange}
  >

    {locations.map((option) => (
      <MenuItem key={option.name} value={option.name}>
        {option.name}
      </MenuItem>
    ))};

  </TextField>
}
export default LocationsSelect;