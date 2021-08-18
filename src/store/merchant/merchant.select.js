import { createSelector } from 'reselect';


const selectMerchantUser = state => state.user;

export const selectMerchantUserRegister = createSelector(
    [selectMerchantUser],
    user => user.register
);

export const selectMerchantUserPhLogin = createSelector(
    [selectMerchantUser],
    user => user.login.phLogin
);

export const selectMerchantUserForgetPass = createSelector(
    [selectMerchantUser],
    user => user.forgetPassword
);


export const selectMerchantUserToken = createSelector(
    [selectMerchantUser],
    user => user.merchantUser.token
);

