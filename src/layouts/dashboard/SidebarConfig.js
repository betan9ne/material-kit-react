// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Neighborhoods',
    path: '/dashboard/Neighborhoods',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'models',
    path: '/dashboard/models',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'constants',
    path: '/dashboard/constants',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  }
];

export default sidebarConfig;
