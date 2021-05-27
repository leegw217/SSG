import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../../components/common/Spinner';
import PaymentSuccess from '../../components/payment/PaymentSuccess';
import {deletePayment} from '../../modules/payment';

const PaymentSuccessContainer = ({backAction}) => {
  const dispatch = useDispatch();
  const {payment} = useSelector(({payment}) => ({
    payment: payment,
  }));

  useEffect(() => {
    return () => {
      dispatch(deletePayment());
    };
  }, []);
  return (
    <>
      {payment.paymentList && payment.paymentList.length !== 0 ? (
        <PaymentSuccess payment={payment} backAction={backAction} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PaymentSuccessContainer;
