import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DashboardCard from "../../components/DashboardCard"
import MonthlyBillChart from "../../components/MonthlyBillChart"
import MonthlyBillDonut from "../../components/MonthlyBillDonut"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height:400,
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={3}>
         <DashboardCard></DashboardCard>
        </Grid>
        <Grid size={3}>
          <DashboardCard></DashboardCard>
        </Grid>
        <Grid size={3}>
          <DashboardCard></DashboardCard>
        </Grid>
        <Grid size={3}>
           <DashboardCard></DashboardCard>
        </Grid>
         <Grid size={6}>
           <Item><MonthlyBillChart></MonthlyBillChart></Item>
        </Grid>
         <Grid size={6}>
           <Item><MonthlyBillDonut></MonthlyBillDonut></Item>
        </Grid>
      </Grid>
    </Box>
  );
}
