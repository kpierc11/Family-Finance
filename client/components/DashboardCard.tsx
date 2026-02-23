import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function DashboardCard() {
  const month = new Date().getMonth();
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardContent>
          <Box sx={{display:"flex", flexDirection:"row"}}>
            <Typography
              sx={{ marginRight: "auto" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              Upcoming Bill
            </Typography>
            <Typography sx={{display:"flex",alignItems:"center", gap:1}} fontSize={14} gutterBottom component="div">
              Due Date: {`${month}-${day}-${year}`}
              <AccessTimeIcon></AccessTimeIcon>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="body1">
              <Typography fontWeight={"bold"}>Type</Typography> Phone Bill
            </Typography>
            <Typography variant="body1">
              <Typography fontWeight={"bold"}>Issuer</Typography>Verizon
            </Typography>
          </Box>
          <Typography fontSize={30} sx={{ marginTop: 5 }} variant="body1">
            $45.00
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
