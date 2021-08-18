import { GET_ISSUE_LIST, ISSUE_LIST_ERROR } from '../types';

const INITIALSTATE = {
  issue: [],
  error: true,
};

const IssueReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case GET_ISSUE_LIST:
      return {
        ...state,
        issue: [...action.payload],
        error: false,
      };
    case ISSUE_LIST_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default IssueReducer;
