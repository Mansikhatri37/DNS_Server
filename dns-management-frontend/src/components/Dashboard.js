import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Box>
      {/* Title */}
      <Box textAlign="center" my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          DNS Management Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your domain records easily from this dashboard.
        </Typography>
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={3} justifyContent="center">
        {/* View DNS Records Card */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                View DNS Records
              </Typography>
              <Typography variant="body2" color="textSecondary">
                See all existing DNS records for your domains.
              </Typography>
              <Box textAlign="center" mt={2}>
                <Button variant="contained" color="primary" component={Link} to="/view-records">
                  View Records
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Add New DNS Record Card */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Add New DNS Record
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Add a new A, CNAME, or other DNS records for your domain.
              </Typography>
              <Box textAlign="center" mt={2}>
                <Button variant="contained" color="success" component={Link} to="/add-record">
                  Add Record
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
