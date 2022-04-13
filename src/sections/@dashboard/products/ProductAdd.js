import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import app from '../../../config';
import TarifService from '../../../services/TarifService';

const initialState = {
  depart: '',
  destination: '',
  prix: ''
};

function ProductAdd() {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { depart, destination, prix } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Voici l'état");
    console.log(state);
    // TarifService.addTarif(JSON.stringify(state))
    //  .then((response) => {
    //    console.log('Administrateur ajouté avec succès: ');
    //    console.log(response.data);
    // history.push('/');
    //    navigate('/dashboard/products', { replace: true });
    //  })
    //  .catch((error) => {
    //    console.log('Une erreur est survenue', error);
    //  });

    axios
      // .post(`https://lktransportbackend.herokuapp.com/tarif`, JSON.stringify(state))
      .post(`https://lktransportbackend.herokuapp.com/tarif`, JSON.stringify(state), {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate('/dashboard/products', { replace: true });
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
              label="Départ"
              {...getFieldProps('depart')}
              value={depart || ''}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              label="Destination"
              {...getFieldProps('destination')}
              value={destination || ''}
              onChange={handleInputChange}
            />
          </Stack>

          <TextField
            fullWidth
            type="number"
            label="Prix"
            {...getFieldProps('prix')}
            value={prix || ''}
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

export default ProductAdd;
