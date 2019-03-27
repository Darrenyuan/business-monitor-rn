// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  loginData: null,
  loginPending: false,
  loginError: null,
  language: 'zh',
  logoutPending: false,
  logoutError: null,
  getAvailableTitlePending: false,
  getAvailableTitleError: null,
  createUserPending: false,
  createUserError: null,
  createProjectPending: false,
  createProjectError: null,
  getAvailableProjectsPending: false,
  getAvailableProjectsError: null,
  getAvailableProjectsSizePending: false,
  getAvailableProjectsSizeError: null,
  getAvailableProjectIssuesPending: false,
  getAvailableProjectIssuesError: null,
  getAvailableProjectIssuesSizePending: false,
  getAvailableProjectIssuesSizeError: null,
  projectList: {
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
    byId: {},
    listNeedReload: false,
    fetchProjectListPending: false,
    fetchProjectListError: null,
    fetchProjectPending: false,
    fetchProjectError: null,
  },
  issueList: {
    items: [],
    page: 1,
    pageSize: 3,
    total: 0,
    byId: {},
    type: 0,
    status: 0,
    interaction: 0,
    listNeedReload: false,
    fetchIssueListPending: false,
    fetchIssueListError: null,
  },
  replyList: {
    items: [],
    byId: {},
    fetchReplyListPending: false,
    fetchReplyListError: null,
  },
  repliesList: {
    items: [],
    byId: {},
    fetchRepliesListPending: false,
    fetchRepliesListError: null,
  },
  stepState: {
    nameExist: true,
  },
  isInCamera: false,
  imagePaths: [],
};

export default initialState;
