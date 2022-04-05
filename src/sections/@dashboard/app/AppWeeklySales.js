// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';
import useGetNeighbourhood from './../../../hooks/useGetNeighbourhood'

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));


// ----------------------------------------------------------------------
 
export default function AppWeeklySales() {
   
  let total = useGetNeighbourhood().docs
  return (
    <RootStyle>
      {/* <IconWrapperStyle>
        <Iconify icon="ant-design:android-filled" width={24} height={24} />
      </IconWrapperStyle> */}
      <Typography variant="h3">{fShortenNumber(total.length)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Neighborhoods
      </Typography>
    </RootStyle>
  );
}
