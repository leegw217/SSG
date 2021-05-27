import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../outline/Title';
import {dateToString} from '../../lib/function/dateToString';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({totalPrice, specificDate}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        ₩ {totalPrice}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {dateToString(specificDate)}
      </Typography>
    </React.Fragment>
  );
}
