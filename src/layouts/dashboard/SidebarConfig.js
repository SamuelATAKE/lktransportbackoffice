// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Tableau de bord',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Réservations',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Tarifs',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Administrateurs',
    path: '/dashboard/administrateurs',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Stations',
    path: '/dashboard/stations',
    icon: getIcon('eva:navigation-fill')
  },
  {
    title: 'Voyages',
    path: '/dashboard/voyages',
    icon: getIcon('eva:car-fill')
  }
];

export default sidebarConfig;
