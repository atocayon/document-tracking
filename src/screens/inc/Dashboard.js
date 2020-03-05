import React from 'react';
import Grid from '@material-ui/core/Grid';
import TableDocument from './TableDocument';

export default function Dashboard (){
  return(
    <div>
      <Grid container spacing={3}>
        <Grid item  xs={6}>
          <TableDocument />
        </Grid>

        <Grid item  xs={6}>
          <TableDocument />
        </Grid>
      </Grid>
    </div>
  );
}
