import React from 'react';
import { Container, Typography } from '@mui/material';
import ReservationAdd from '../sections/@dashboard/user/ReservationAdd';

import Page from '../components/Page';

function AddReservation() {
  return (
    <Page title="Dashboard: Ajouter une réservation| LK">
      <Container>
        <br />
        <Typography variant="h4" sx={{ mb: 5 }}>
          Ajouter une réservation
        </Typography>

        <ReservationAdd />
      </Container>
    </Page>
  );
}

export default AddReservation;
