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
    title: 'Projects',
    path: '/Projects',
    icon: getIcon('bx:building')
  }
];

export default sidebarConfig;
