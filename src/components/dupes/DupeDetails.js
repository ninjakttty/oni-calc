import React from 'react';

// material
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

// components
import ResourceChips from '../resources/ResourceChips';

export default function DupeDetails({ details }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="title">Dupe Details</Typography>
      <Typography variant="subheading" className={classes.title}>
        Inputs
      </Typography>
      <ResourceChips ios={details.inputs} type="Inputs" />
      <Typography variant="subheading" className={classes.title}>
        Outputs
      </Typography>
      <ResourceChips ios={details.outputs} type="Outputs" />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    minWidth: 400,
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  },
}));
