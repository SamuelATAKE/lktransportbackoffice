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

import AdminService from '../../../services/AdminService';
import StationService from '../../../services/StationService';
import app from '../../../config';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------
const initialState = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  station: '',
  password: ''
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState(initialState);
  const { prenom, nom, email, telephone, password, station } = state;
  const [data, setData] = useState({});
  const history = useNavigate();
  const cinkasse = 'Cinkassé';
  const kara = 'Kara';
  const lome = 'Lomé';

  const RegisterSchema = Yup.object().shape({
    prenom: Yup.string()
      .min(2, 'Trop court!')
      .max(50, 'Trop Long!')
      .required('First name required'),
    nom: Yup.string().min(2, 'Trop court!').max(50, 'Trop Long!').required('Le nom est requis'),
    email: Yup.string().email('Votre adresse mail doit être valide').required('Email requis'),
    password: Yup.string().required('Mot de passe requis')
  });

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event);
  };

  const [estate, setEstate] = useState({ stations: [] });

  StationService.getStations().then((response) => {
    // tab.push(response.data);
    // console.log('After push');
    // console.log(JSON.stringify(response.data));
    response.data.forEach((element) => {
      // console.log(element.nom);
      setEstate({ stations: response.data });
    });
    // console.log('L etat');
    // console.log(state);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const formik = useFormik({
    initialValues: {
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      station: '',
      password: ''
    },
    onSubmit: (e) => {}
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Voici l'état");
    console.log(state);
    AdminService.addAdmin(JSON.stringify(state))
      .then((response) => {
        console.log('Administrateur ajouté avec succès: ');
        console.log(response.data);
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        console.log('Une erreur est survenue', error);
      });
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
              {...getFieldProps('prenom')}
              value={prenom || ''}
              onChange={handleInputChange}
              error={Boolean(touched.prenom && errors.prenom)}
              helperText={touched.prenom && errors.prenom}
            />

            <TextField
              fullWidth
              label="Nom"
              {...getFieldProps('nom')}
              value={nom || ''}
              onChange={handleInputChange}
              error={Boolean(touched.nom && errors.nom)}
              helperText={touched.nom && errors.nom}
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
            type="telephone"
            label="Numéro de téléphone"
            {...getFieldProps('telephone')}
            value={telephone || ''}
            onChange={handleInputChange}
            error={Boolean(touched.telephone && errors.telephone)}
            helperText={touched.telephone && errors.telephone}
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
              <MenuItem value="">Veuillez sélectionner</MenuItem>

              {estate.stations.map((station) => (
                <MenuItem value={Object.assign(station)} key={station.id}>
                  {station.nom} {station.ville}
                </MenuItem>
              ))}
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
