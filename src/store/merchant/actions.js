// import {
//   GET_MERCHANT_DATA,
//   SET_MERCHANT_USER,
//   GET_MERCHANT_DATA_ERROR,
//   SET_MERCHANT_PH_LOGIN,
//   SET_MERCHANT_LOGIN,
//   FIRST_REGISTER_MERCHANT,
//   FORGET_PASSWORD
// } from './merchant.type';

// export const setMerchantUser = user => ({
//   type: SET_MERCHANT_USER,
//   payload: user
// });

// export const getMerchantUser = (merchantPromise) => async dispatch => {
//   const response = await merchantPromise;

//   try {
//     console.log('ERROR ', response);

//     dispatch({
//       type: GET_MERCHANT_DATA,
//       payload: response.data
//     });
//   } catch (error) {
//     console.log('ERROR ', error.status);
//     dispatch({
//       type: GET_MERCHANT_DATA_ERROR
//     });
//   }
// };

// export const setPhLogin = data => ({
//   type: SET_MERCHANT_PH_LOGIN,
//   payload: data
// });
// export const setMerchantLogin = data => ({
//   type: SET_MERCHANT_LOGIN,
//   payload: data
// });

// export const firstRegisterMerchant = data => dispatch => {
//   dispatch({
//     type: FIRST_REGISTER_MERCHANT,
//     payload: data
//   });
// };

// export const registerMerchant = data => dispatch => {
//   dispatch(prevState => {
//     console.log(prevState);
//   });
// };

// export const getforgetPassword = data => ({
//   type: FORGET_PASSWORD,
//   payload: data
// });
