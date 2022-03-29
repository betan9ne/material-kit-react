// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Neighborhoods',
    path: '/Neighborhoods',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'models',
    path: '/models',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'constants',
    path: '/constants',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'user',
    path: '/user',
    icon: getIcon('eva:people-fill')
  }
];

export default sidebarConfig;
