import React from 'react';
// material
import { Container, Typography } from '@mui/material';
import ProductAdd from '../sections/@dashboard/products/ProductAdd';

import Page from '../components/Page';

function AddProduct() {
  return (
    <Page title="Dashboard: Ajouter plan tarifaire | LK">
      <Container>
        <br />
        <Typography variant="h4" sx={{ mb: 5 }}>
          Ajouter un plan tarifaire
        </Typography>

        <ProductAdd />
      </Container>
    </Page>
  );
}

export default AddProduct;
