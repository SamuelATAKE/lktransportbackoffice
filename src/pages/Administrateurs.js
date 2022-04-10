import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import AdminService from '../services/AdminService';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'prenom', label: 'Prénom', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'email', label: 'Adresse mail', alignRight: false },
  { id: 'telephone', label: 'Numéro de téléhone', alignRight: false },
  { id: 'station', label: 'Station', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function Administrateurs() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [state, setState] = useState({ admins: [] });

  // AdminService.getAdmins().then((response) => {
  // tab.push(response.data);
  // console.log('After push');
  // console.log(JSON.stringify(response.data));
  //  response.data.forEach((element) => {
  // console.log(element.nom);
  //    setState({ admins: response.data });
  //  });
  //  console.log('La station');
  // console.log(state);
  //  state.admins.forEach((element) => {
  //    console.log(element.station);
  //  });
  // });

  useEffect(() => {
    axios.get(`https://lktransportbackend.herokuapp.com/administrateur`).then((res) => {
      // axios.get(`http://localhost:8080/administrateur`).then((res) => {
      setState({ admins: res.data });
    });
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = state.admins.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - state.admins.length) : 0;

  const filteredUsers = applySortFilter(state.admins, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Page title="Administrateurs | Dashboard-LK">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Administrateurs
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/ajouter-admin"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nouveau administrateur
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={state.admins.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, prenom, nom, email, telephone, avatarUrl, station } = row;
                      const isItemSelected = selected.indexOf(prenom) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, prenom)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={prenom} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {prenom}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{nom}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{telephone}</TableCell>
                          <TableCell align="left">Station</TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={state.admins.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

export default Administrateurs;
