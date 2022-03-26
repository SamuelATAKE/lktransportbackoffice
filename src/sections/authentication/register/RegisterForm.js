import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { toast } from 'react-toastify';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import app from '../../../config';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  number: '',
  station: '',
  password: ''
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState(initialState);
  const { firstName, lastName, email, number, password, station } = state;
  const [data, setData] = useState({});
  const history = useNavigate();
  const cinkasse = 'Cinkassé';
  const kara = 'Kara';
  const lome = 'Lomé';

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Trop court!')
      .max(50, 'Trop Long!')
      .required('First name required'),
    lastName: Yup.string()
      .min(2, 'Trop court!')
      .max(50, 'Trop Long!')
      .required('Le nom est requis'),
    email: Yup.string().email('Votre adresse mail doit être valide').required('Email requis'),
    password: Yup.string().required('Mot de passe requis')
  });

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
      station: '',
      password: ''
    },
    onSubmit: (e) => {
      console.log('Cool');
      console.log(state);

      app
        .database()
        .ref()
        .child('users')
        .push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Administrateur ajouté');
          }
        });
      setTimeout(() => history.push('/'), 500);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Cool');
    console.log(state);

    // app
    //  .database()
    //  .ref()
    //  .child('/users')
    //  .push(state, (err) => {
    //    console.log('Arrived');
    //    if (err) {
    //      toast.error(err);
    //    } else {
    //      toast.success('Administrateur ajoutée');
    //    }
    //  });
    // navigate('/', { replace: true });
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Prénom(s)"
              {...getFieldProps('firstName')}
              value={firstName || ''}
              onChange={handleInputChange}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Nom"
              {...getFieldProps('lastName')}
              value={lastName || ''}
              onChange={handleInputChange}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Adresse mail"
            {...getFieldProps('email')}
            value={email || ''}
            onChange={handleInputChange}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            type="number"
            label="Numéro de téléphone"
            {...getFieldProps('number')}
            value={number || ''}
            onChange={handleInputChange}
            error={Boolean(touched.number && errors.number)}
            helperText={touched.number && errors.number}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Station</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...getFieldProps('station')}
              value={station || ''}
              onChange={handleInputChange}
              label="Station"
            >
              <MenuItem value={cinkasse}>Cinkassé</MenuItem>
              <MenuItem value={lome}>Sokodé</MenuItem>
              <MenuItem value={kara}>Kara</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            {...getFieldProps('password')}
            value={password || ''}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            S'inscrire
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
