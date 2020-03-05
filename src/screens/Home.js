import React from 'react';
import PrimarySearchAppBar from './inc/PrimarySearchAppBar';
import Grid from '@material-ui/core/Grid';
import Dashboard from './inc/Dashboard';
function Home(){

  return(
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PrimarySearchAppBar />
        </Grid>
        <Grid item xs={12}>
          <Dashboard />
        </Grid>
      </Grid>
    </div>

  );
}



export default Home;
