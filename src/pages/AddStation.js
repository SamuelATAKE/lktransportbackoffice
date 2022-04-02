import React from 'react';
// material
import { Container, Typography } from '@mui/material';
import StationAdd from '../sections/@dashboard/station/StationAdd';

import Page from '../components/Page';

function AddStation() {
  return (
    <Page title="Dashboard: Ajouter une station | LK">
      <Container>
        <br />
        <Typography variant="h4" sx={{ mb: 5 }}>
          Ajouter une station
        </Typography>

        <StationAdd />
      </Container>
    </Page>
  );
}

export default AddStation;
