import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import app from '../../../config';

const initialState = {
  departure: '',
  destination: '',
  price: ''
};

function ProductAdd() {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { departure, destination, price } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("L'état");
    console.log(state);

    app
      .database()
      .ref()
      .child('/tarifs')
      .push(state, (err) => {
        console.log('Arrived');
        if (err) {
          toast.error(err);
        } else {
          toast.success('Tarif ajouté');
        }
      });
    navigate('/', { replace: true });
  };

  const formik = useFormik({
    initialValues: {
      departure: '',
      destination: '',
      price: ''
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
              {...getFieldProps('departure')}
              value={departure || ''}
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
            {...getFieldProps('price')}
            value={price || ''}
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
