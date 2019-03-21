// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { MONITOR_SET_ISSUE_STATUS } from './constants';

export function setIssueStatus(args = {}) {
  return {
    type: MONITOR_SET_ISSUE_STATUS,
    data: args,
  };
}

export function reducer(state, action) {

  switch (action.type) {

    case MONITOR_SET_ISSUE_STATUS:
      console.log("action", action);
      const item = state.issueList.byId[action.data.issueId];
      const newItem = { ...item, status: action.data.status };
      const byId = { ...state.issueList.byId };
      byId[action.data.issueId] = newItem;
      return {
        ...state,
        byId: byId,
      };

    default:
      return state;
  }
}
