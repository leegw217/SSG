import {fade, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#9e9e9e', 0.15),
    '&:hover': {
      backgroundColor: fade('#9e9e9e', 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  noPaymentList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
  },
  morePaymentListArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  morePaymentListBtn: {
    backgroundColor: 'rgb(218, 41, 28)',
    color: 'white',
    '&:hover': {
      color: 'rgb(218, 41, 28)',
    },
  },
}));

export default useStyles;
