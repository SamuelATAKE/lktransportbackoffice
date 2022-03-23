import React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function ProductAdd() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      departure: '',
      destination: '',
      price: ''
    },
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth label="Départ" {...getFieldProps('departure')} />

            <TextField fullWidth label="Destination" {...getFieldProps('destination')} />
          </Stack>

          <TextField fullWidth type="number" label="Prix" {...getFieldProps('price')} />

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
