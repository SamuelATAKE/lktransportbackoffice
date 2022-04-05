import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'axios';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import AdminService from '../../../services/AdminService';

// ----------------------------------------------------------------------

const initialState = {
  email: '',
  password: '',
  remember: true
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState(initialState);
  const { email, password } = state;

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Votre adresse mail doit être valide')
      .required('Adresse mail requise'),
    password: Yup.string().required('Mot de passe requis')
  });

  const [estate, setEstate] = useState({ admins: [] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const onSubmit = (e) => {
    axios.get(`https://lktransportbackend.herokuapp.com/administrateur`).then((res) => {
      setEstate({ admins: res.data });
    });

    console.log('L etat');
    console.log(state);
    // AdminService.getAdmins().then((response) => {
    // tab.push(response.data);
    // console.log('After push');
    // console.log(JSON.stringify(response.data));
    //  response.data.forEach((element) => {
    // console.log(element.nom);
    // console.log('setted datas');
    //    setEstate({ admins: response.data });
    //  });
    // console.log('L etat');
    // console.log(state);
    // });
    // console.log('Parcours');
    // estate.admins.forEach((element) => {
    //  console.log(element);
    //  if (state.email === element.email && state.password === element.password) {
    //    navigate('/', { replace: true });
    //  }
    // });

    estate.admins.forEach((element) => {
      if (state.email === element.email && state.password === element.password) {
        navigate('/', { replace: true });
        sessionStorage.setItem('userConnected', element);
      }
    });
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={onSubmit}>
        <Stack spacing={3}>
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
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            {...getFieldProps('password')}
            value={password || ''}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Se souvenir de moi"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Mot de passe oublié?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Connexion
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
