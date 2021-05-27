import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../outline/Title';
import {Button} from '@material-ui/core';
import {dateToStringWithTime} from '../../lib/function/dateToString';

const ItemList = ({paymentList}) => {
  const [detailId, setDetailId] = useState(-1);
  const onClickDetailHandler = id => {
    if (id == detailId) {
      setDetailId(-1);
    } else {
      setDetailId(id);
    }
  };
  return (
    <>
      <React.Fragment>
        <Title>검색</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>결제 번호</TableCell>
              <TableCell>매장 이름</TableCell>
              <TableCell>구매 날짜</TableCell>
              <TableCell>거래 금액</TableCell>
              <TableCell>지불 방식</TableCell>
              <TableCell>거래 결과</TableCell>
              <TableCell style={{paddingLeft: 31}}>거래 물품</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentList.map(item => (
              <>
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.storeId}</TableCell>
                  <TableCell>{dateToStringWithTime(item.txDateTime)}</TableCell>
                  <TableCell>{item.paymentAmount}</TableCell>
                  <TableCell>{item.paymentPlan}</TableCell>
                  <TableCell>{item.paymentResult}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => onClickDetailHandler(item.id)}>
                      상세보기
                    </Button>
                  </TableCell>
                </TableRow>
                {detailId === item.id ? (
                  <React.Fragment>
                    <TableCell colSpan={10}>
                      <TableHead>
                        <TableRow>
                          <TableCell>물품 번호</TableCell>
                          <TableCell>물품 코드</TableCell>
                          <TableCell>물품 명</TableCell>
                          <TableCell>물품 가격</TableCell>
                          <TableCell>물품 수</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.paymentDetail.map(detail => (
                          <TableRow key={detail.prodId}>
                            <TableCell>{detail.prodId}</TableCell>
                            <TableCell>{detail.prodCode}</TableCell>
                            <TableCell>{detail.prodName}</TableCell>
                            <TableCell>{detail.prodPrice}</TableCell>
                            <TableCell>{detail.qty}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TableCell>
                  </React.Fragment>
                ) : null}
              </>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </>
  );
};

export default ItemList;
