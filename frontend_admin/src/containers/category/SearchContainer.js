import React, {useEffect, useState} from 'react';
import SearchInput from '../../Components/common/SearchInput';
import ItemList from '../../Components/category/ItemList';
import useStyles from '../../css/useStyles';
import DatePickerComponent from '../../Components/common/DatePickerComponent';
import SetDuration from '../../Components/common/SetDuration';
import * as managingAPI from '../../lib/api/managing';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {IconButton} from '@material-ui/core';
import {dateToString} from '../../lib/function/dateToString';

const SearchContainer = () => {
  const classes = useStyles();

  // 고객 번호 검색 키워드
  const [keyword, setKeyword] = useState('');
  // Enter 입력 확인
  const [isEnter, setIsEnter] = useState(false);

  // 구매 기한
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isBtnClicked, setIsBtnClicked] = useState('전체');

  // 현재 페이지
  const [page, setPage] = useState(0);

  // 현재 고객의 구매 내역 리스트
  const [paymentList, setPaymentList] = useState([]);
  const [curPaymentList, setCurPaymentList] = useState([]);

  //인풋 변경 이벤트 핸들러
  const onChange = e => {
    setKeyword(e.target.value);
  };

  // 검색 엔터 이벤트 핸들러
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      setIsEnter(!isEnter);
      loadData(page);
    }
  };

  const loadData = async PAGE => {
    if (isBtnClicked === '전체') {
      let response = await managingAPI.getCostomerAllPaymentList(keyword, PAGE);
      setPaymentList(response.data);
    } else {
      let response = await managingAPI.getCostomerPaymentList(
        dateToString(startDate),
        dateToString(endDate),
        keyword,
        PAGE,
      );
      setPaymentList(response.data);
    }
  };

  useEffect(() => {
    if (page === 0) {
      setCurPaymentList(paymentList);
    } else {
      setCurPaymentList(curPaymentList.concat(paymentList));
    }
  }, [paymentList]);

  useEffect(() => {
    setPage(0);
    loadData(page);
  }, [startDate, endDate]);

  useEffect(() => {
    loadData(page);
  }, [page]);

  useEffect(() => {
    setPage(0);
    loadData(page);
  }, [isEnter]);

  return (
    <>
      <div>
        <SetDuration
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          isBtnClicked={isBtnClicked}
          setIsBtnClicked={setIsBtnClicked}
        />
        <DatePickerComponent
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          setIsBtnClicked={setIsBtnClicked}
        />
      </div>
      <div className={classes.search}>
        <SearchInput
          keyword={keyword}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
      <div className={classes.paper}>
        {curPaymentList.length === 0 ? (
          <>
            <div className={classes.noPaymentList}>구매 내역이 없습니다.</div>
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
      </div>
    </>
  );
};

export default SearchContainer;
