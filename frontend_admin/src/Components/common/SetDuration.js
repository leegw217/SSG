import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnStyle: {
    marginRight: 2,
    marginBottom: 2,
  },
}));

const SetDuration = ({
  setStartDate,
  setEndDate,
  isBtnClicked,
  setIsBtnClicked,
}) => {
  const classes = useStyles();
  const handleBtnClicked = e => {
    const today = new Date();
    const weeksAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7,
    );
    const threeDays = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 3,
    );
    const oneMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate(),
    );
    const threeMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 3,
      today.getDate(),
    );
    setIsBtnClicked(e.target.innerText);
    if (e.target.innerText === '전체') {
      setStartDate(today);
      setEndDate(today);
    }
    if (e.target.innerText === '오늘') {
      setStartDate(today);
      setEndDate(today);
    }
    if (e.target.innerText === '1주일') {
      setStartDate(weeksAgo);
      setEndDate(today);
    }
    if (e.target.innerText === '3일') {
      setStartDate(threeDays);
      setEndDate(today);
    }
    if (e.target.innerText === '1개월') {
      setStartDate(oneMonth);
      setEndDate(today);
    }
    if (e.target.innerText === '3개월') {
      setStartDate(threeMonth);
      setEndDate(today);
    }
    if (e.target.innerText === '임의설정') {
      setStartDate(today);
      setEndDate(today);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Button
          className={classes.btnStyle}
          onClick={handleBtnClicked}
          variant="outlined"
          color={isBtnClicked === '전체' ? 'secondary' : 'default'}>
          전체
        </Button>
        <Button
          className={classes.btnStyle}
          onClick={handleBtnClicked}
          variant="outlined"
          color={isBtnClicked === '오늘' ? 'secondary' : 'default'}>
          오늘
        </Button>
        <Button
          className={classes.btnStyle}
          onClick={handleBtnClicked}
          variant="outlined"
          color={isBtnClicked === '1주일' ? 'secondary' : 'default'}>
          1주일
        </Button>
        <Button
          className={classes.btnStyle}
          onClick={handleBtnClicked}
          variant="outlined"
          color={isBtnClicked === '3일' ? 'secondary' : 'default'}>
          3일
        </Button>
        <Button
          className={classes.btnStyle}
          onClick={handleBtnClicked}
          variant="outlined"
          color={isBtnClicked === '1개월' ? 'secondary' : 'default'}>
          1개월
        </Button>
        <Button
          className={classes.btnStyle}
          onClick={handleBtnClicked}
          variant="outlined"
          color={isBtnClicked === '3개월' ? 'secondary' : 'default'}>
          3개월
        </Button>
        <Button
          className={classes.btnStyle}
          onClick={handleBtnClicked}
          variant="outlined"
          color={isBtnClicked === '임의설정' ? 'secondary' : 'default'}>
          임의설정
        </Button>
      </div>
    </>
  );
};

export default SetDuration;
