import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopStationCard from './StationCard';

// ----------------------------------------------------------------------

StationList.propTypes = {
  stations: PropTypes.array.isRequired
};

export default function StationList({ stations, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {stations.map((station) => (
        <Grid key={station.id} item xs={12} sm={6} md={3}>
          <ShopStationCard station={station} />
        </Grid>
      ))}
    </Grid>
  );
}
