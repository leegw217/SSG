import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../Components/category/Chart';
import Deposits from '../Components/category/Deposits';
import ItemList from '../Components/category/ItemList';
import Outline from '../Components/outline/Outline';
import Copyright from '../Components/outline/Copyright';
import useStyles from '../css/useStyles';
import * as managingAPI from '../lib/api/managing';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {IconButton} from '@material-ui/core';
import {dateToString} from '../lib/function/dateToString';
import DatePickerComponentJustOne from '../Components/common/DatePickerComponentJustOne';
import {useHistory} from 'react-router-dom';

export default function Dashboard() {
  // history
  const history = useHistory();
  // css
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // state
  const [page, setPage] = useState(0);
  const [paymentList, setPaymentList] = useState([]);
  const [curPaymentList, setCurPaymentList] = useState([]);
  const [allPaymentList, setAllPaymentList] = useState([]);
  const [deposit, setDeposit] = useState(0);
  const [specificDate, setSpecificDate] = useState(new Date());

  // 페이지 변경 시 호출. ex 더보기
  const loadData = async page => {
    let response = await managingAPI.getRecentOrder(
      dateToString(specificDate),
      page,
    );
    setPaymentList(response.data);
  };

  // 날짜 변경 시 호출.
  const laodDataBySpecificDate = async () => {
    loadData(0);
    let response = await managingAPI.getCostomerAllPaymentListByDate(
      dateToString(specificDate),
    );
    setAllPaymentList(response.data);
  };

  // 결제 리스트 페이징
  useEffect(() => {
    if (page == 0) setCurPaymentList(paymentList);
    else {
      setCurPaymentList(curPaymentList.concat(paymentList));
    }
  }, [paymentList]);

  // 전체 결제 리스트. 금액 계산
  useEffect(() => {
    let sumDeposit = 0;
    for (let i = 0; i < allPaymentList.length; i++) {
      sumDeposit += allPaymentList[i].paymentAmount;
    }
    setDeposit(sumDeposit);
  }, [allPaymentList]);

  // 페이지 변경
  useEffect(() => {
    loadData(page);
  }, [page]);

  // 날짜 변경
  useEffect(() => {
    setPage(0);
    laodDataBySpecificDate();
  }, [specificDate]);

  return (
    <div className={classes.root}>
      <Outline title={'Dashboard'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div>
            <DatePickerComponentJustOne
              setSpecificDate={setSpecificDate}
              specificDate={specificDate}
            />
          </div>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart paymentList={allPaymentList} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits totalPrice={deposit} specificDate={specificDate} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {allPaymentList.length === 0 ? (
                  <>
                    <div className={classes.noPaymentList}>
                      구매 내역이 없습니다.
                    </div>
                  </>
                ) : (
                  <React.Fragment>
                    <ItemList paymentList={curPaymentList} />
                    <div className={classes.morePaymentListArea}>
                      <IconButton
                        aria-label="more"
                        className={classes.morePaymentListBtn}
                        onClick={() => setPage(page + 1)}>
                        <ArrowDropDownIcon />
                      </IconButton>
                    </div>
                  </React.Fragment>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
