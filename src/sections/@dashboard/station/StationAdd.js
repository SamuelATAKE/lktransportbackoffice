import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const initialState = {
  nom: '',
  ville: '',
  localisation: '',
  contact: ''
};

function StationAdd() {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { nom, ville, localisation, contact } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Voici l'état");
    console.log(state);
    // StationService.addStation(JSON.stringify(state))
    //  .then((response) => {
    //    console.log('Station ajoutée avec succès: ');
    //    console.log(response.data);
    //    // history.push('/');
    //    navigate('/dashboard/stations', { replace: true });
    //  })
    //  .catch((error) => {
    //    console.log('Une erreur est survenue', error);
    //  });

    axios
      // .post(`https://lktransportbackend.herokuapp.com/station`, JSON.stringify(state))
      .post(`http://localhost:8080/station`, JSON.stringify(state), {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((res) => {
        console.log('Posted');
        console.log(res);
        console.log(res.data);
        navigate('/dashboard/stations', { replace: true });
      });
  };
  const formik = useFormik({
    initialValues: {
      depart: '',
      destination: '',
      prix: ''
    },
    onSubmit: () => {
      navigate('/dashboard/products', { replace: true });
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nom de la station"
              {...getFieldProps('nom')}
              value={nom || ''}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              label="Ville de résidence"
              {...getFieldProps('ville')}
              value={ville || ''}
              onChange={handleInputChange}
            />
          </Stack>

          <TextField
            fullWidth
            label="Localisation(Quartier)"
            {...getFieldProps('localisation')}
            value={localisation || ''}
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            label="Contact(s)"
            {...getFieldProps('contact')}
            value={contact || ''}
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

export default StationAdd;
