import React from 'react';
// material
import { Container, Typography } from '@mui/material';
import VoyageAdd from '../sections/@dashboard/voyage/VoyageAdd';

import Page from '../components/Page';

function AddVoyage() {
  return (
    <Page title="Dashboard: Programmer un voyage | LK">
      <Container>
        <br />
        <Typography variant="h4" sx={{ mb: 5 }}>
          Programmer un voyage
        </Typography>

        <VoyageAdd />
      </Container>
    </Page>
  );
}

export default AddVoyage;
