import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopVoyageCard from './VoyageCard';

// ----------------------------------------------------------------------

VoyageList.propTypes = {
  voyages: PropTypes.array.isRequired
};

export default function VoyageList({ voyages, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {voyages.map((voyage) => (
        <Grid key={voyage.id} item xs={12} sm={6} md={3}>
          <ShopVoyageCard voyage={voyage} />
        </Grid>
      ))}
    </Grid>
  );
}
