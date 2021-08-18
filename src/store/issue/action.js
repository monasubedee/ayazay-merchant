// import { ISSUE_TRACKER, ISSUE_TRACKER_ERROR } from './type';
// import api from '../../constants/api';

// export const createIssue = (data) => async (dispatch) => {
//   console.log(data);
//   try {
//     const response = await api.post('/issue-tracker', data);
//     dispatch({
//       type: ISSUE_TRACKER,
//       payload: response,
//     });
//   } catch (e) {
//     dispatch({
//       type: ISSUE_TRACKER_ERROR,
//     });
//   }
// };
