import React from 'react';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';

function ReservationAdd() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
      route: '',
      lugage: '',
      comment: ''
    },
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event);
  };

  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField fullWidth label="Nom complet" {...getFieldProps('name')} />

          <TextField fullWidth label="Numéro de téléphone" {...getFieldProps('number')} />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Trajet</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...getFieldProps('route')}
              label="Trajet"
              onChange={handleChange}
            >
              <MenuItem value={10}>Cinkassé - Kara</MenuItem>
              <MenuItem value={20}>Lomé-Sokodé</MenuItem>
              <MenuItem value={30}>Lomé-Kara</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Avez-vous des bagages?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...getFieldProps('lugage')}
              label="Avez-vous des bagages?"
              onChange={handleChange}
            >
              <MenuItem value={10}>Non</MenuItem>
              <MenuItem value={20}>Oui, juste mon sac de voyage</MenuItem>
              <MenuItem value={30}>Oui, des bagages conséquents</MenuItem>
            </Select>
          </FormControl>

          <TextField fullWidth label="Commentaires" {...getFieldProps('comment')} />

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

export default ReservationAdd;
