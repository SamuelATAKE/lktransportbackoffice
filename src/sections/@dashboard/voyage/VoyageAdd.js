import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import app from '../../../config';

const initialState = {
  tarif: '',
  date: '',
  places: '',
  disponibilite: ''
};

function VoyageAdd() {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { tarif, date, places, disponibilite } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Voici l'état");
    console.log(state);
    // VoyageService.addVoyage(JSON.stringify(state))
    //  .then((response) => {
    //    console.log('Voyage ajoutée avec succès: ');
    //    console.log(response.data);
    //    // history.push('/');
    //    navigate('/dashboard/Voyages', { replace: true });
    //  })
    //  .catch((error) => {
    //    console.log('Une erreur est survenue', error);
    //  });

    axios
      // .post(`https://lktransportbackend.herokuapp.com/voyage`, JSON.stringify(state))
      .post(`http://localhost:8080/voyage`, JSON.stringify(state), {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate('/dashboard/Voyages', { replace: true });
      });
  };
  const formik = useFormik({
    initialValues: {
      tarif: '',
      date: '',
      places: '',
      disponibilite: ''
    },
    onSubmit: () => {
      navigate('/dashboard/voyages', { replace: true });
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={onSubmit}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tarif</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...getFieldProps('tarif')}
              value={tarif || ''}
              onChange={handleInputChange}
              label="Tarif"
            >
              <MenuItem value="">Veuillez sélectionner</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="datetime-local"
            label="Date"
            {...getFieldProps('date')}
            value={date || ''}
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            type="number"
            label="Nombre de places"
            {...getFieldProps('places')}
            value={places || ''}
            onChange={handleInputChange}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Ajouter
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default VoyageAdd;
