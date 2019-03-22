// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { MONITOR_IS_IN_CAMERA } from './constants';

export function setIsInCamera(args = {}) {
  return {
    type: MONITOR_IS_IN_CAMERA,
    data: args,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MONITOR_IS_IN_CAMERA:
      return {
        ...state,
        isInCamera: action.data.isInCamera,
      };

    default:
      return state;
  }
}
