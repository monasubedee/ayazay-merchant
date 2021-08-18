// import api from '../../constants/api';
// import {
//     SHOP_PROFILE_UPDATE, SHOP_PROFILE_UPDATE_ERROR, SHOP_PROFILE_GET_DATA, 
//     SHOP_PROFILE_GET_DATA_ERROR, GET_ALL_SHOP, GET_ALL_SHOP_ERROR, CREATE_SHOP, 
//     CREATE_SHOP_ERROR, ALL_SHOP_LOADING,SUCCESS_LOADING,CLEAN_MESSAGE,INIT_LOADING
// } from './type';

// export const getAllShopProfile = () => async (dispatch) => {
//     const response = await api.get('/shop');

//     try {
//         dispatch({
//             type: GET_ALL_SHOP,
//             payload: response.data,
//         });
//     } catch (error) {
//         dispatch({
//             type: GET_ALL_SHOP_ERROR,
//         });
//     }
// };

// export const updateShopProfile = (data) => async (dispatch) => {
 
//         try {
//             const response = await api.put(`/shop/${data.id}`, data);
//             dispatch({
//                 type: SHOP_PROFILE_UPDATE,
//                 payload: response.data,
//             });
//         } catch (error) {
//             dispatch({
//                 type: SHOP_PROFILE_UPDATE_ERROR,
//             });
//         }
  
// };

// export const shopCreate = (data) => async (dispatch) => {
   
//         try {
//             const response = await api.post('/shop', data);
//                 dispatch({
//                     type: CREATE_SHOP,
//                     payload: response.data,
//                 });
//         } catch (error) {
//             dispatch({
//                 type: CREATE_SHOP_ERROR,
//             });
//         }
// };

// export const getShopProfile = (id) => async (dispatch) => {
//     const response = await api.get(`/shop/${id}`);
//     try {
//         dispatch({
//             type: SHOP_PROFILE_GET_DATA,
//             payload: response.data,
//         });
//     } catch (error) {
//         dispatch({
//             type: SHOP_PROFILE_GET_DATA_ERROR,
//         });
//     }
// };

// export const getLoading = () => (dispatch) => {
//     dispatch({
//         type: ALL_SHOP_LOADING,
//     });
// };

// export const successLoading = () => (dispatch) => {
//     dispatch({
//         type : SUCCESS_LOADING
//     })
// }

// export const cleanErrorMessage = () => (dispatch) => {
//     dispatch({
//         type : CLEAN_MESSAGE
//     })
// }

// export const initLoading = () => (dispatch) => {
//     dispatch({
//         type : INIT_LOADING
//     })
// }
