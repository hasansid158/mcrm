// import React from 'react';
// import { useSelector } from 'react-redux';

// import { detailColumn } from 'enum/tableColumnEnum';
// import ActionPageMain from 'pages/components/ActionPageMain';
// import createFormEnum from 'enum/createFormEnum';

// import { fetchPaymentOrder } from 'redux/slices/actionSlice/orderSlice';
// import { paymentorderColumns } from 'components/tableColumns/paymentorderColumn';

// const PaymentOrders = () => {
//   const { payment } = useSelector(state => state.actions.orders);
//   const columns = paymentorderColumns();

//   return (
//     <ActionPageMain
//       formKey={createFormEnum.payment_orders}
//       rows={payment}
//       columns= {columns}
//       label='Payment Orders'
//       createLabel='Create Payment Orders'
//       fetchApi={fetchPaymentOrder}
//     />
//   );
// }

// export default PaymentOrders;
