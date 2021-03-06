import axios from 'axios';
let baseUrl = 'http://192.168.0.200:8080/imageserver';

let imageUrl = 'http://192.168.0.200:8080/imageserver/imageThumbnail';
let option = {
  baseURL: baseUrl,
  timeout: 10000,
  // crossdomain: true,
  withCredentials: true,
};
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://212.64.74.113/api';
  imageUrl = 'http://212.64.74.113/api/imageThumbnail';
  option = { ...option, crossdomain: false, timeout: 10000, baseURL: baseUrl };
}

export const URL = imageUrl;

const instance = axios.create(option);
instance.interceptors.response.use(res => {
  return res;
});

export function apiLongin(args = {}) {
  return instance.post(baseUrl + '/login', {
    username: args.username,
    password: args.password,
  });
}

export function apiLogout(args = {}) {
  return instance.get(baseUrl + '/logout');
}

export function apiGetAvailableTitle(args = {}) {
  return instance.get(baseUrl + '/role/under');
}

export function apiCreateUser(args = {}) {
  return instance.post(baseUrl + '/user', {
    username: args.username,
    title: args.title,
  });
}

export function apiResetPassword(args = {}) {
  return instance.put(`/password?password=${args.password}&newPassword=${args.newPassword}`);
}

export function apiCreateStepUser(args = {}) {
  return instance.post(baseUrl + '/user/step', {
    username: args.username,
    title: args.title,
    projectId: args.projectId,
    projectName: args.projectName,
  });
}
export function apiIfUserNameExist(args = {}) {
  return instance.get(`${baseUrl}/user/check?username=${args.username}`);
}

export function apiCreateProject(args = {}) {
  return instance.post(baseUrl + '/project', {
    name: args.name,
    startTime: args.startTime,
    endTime: args.endTime,
    overview: args.overview,
    location: args.location,
    designUnit: args.designUnit,
    monitorUnit: args.monitorUnit,
    constructionUnit: args.constructionUnit,
  });
}

export function apiGetAvailableProjects(args = {}) {
  return instance.get(baseUrl + '/project/all');
}

export function apiGetAvailableProjectsSize(args = {}) {
  return instance.get(baseUrl + '/project/size');
}

export function apiCreateReply(args = {}) {
  return instance.post(baseUrl + '/comment', {
    issueId: args.issueId,
    username: args.username,
    content: args.content,
  });
}

export function apiFetchReplyList(args = {}) {
  return instance.get(`${baseUrl}/issues/${args.issueId}/feedback`);
}
export function apiFetchRepliesList(args = {}) {
  return instance.get(`${baseUrl}/issues/${args.issueId}/replies`);
}
export function apiGetAvailableProjectIssues(args = {}) {
  if (!args.current) {
    args = { ...args, current: 1 };
  }
  if (!args.pageSize) {
    args = { ...args, pageSize: 10 };
  }
  if (!args.total) {
    args = { ...args, current: 1 };
  }
  if (!args.defaultCurrent) {
    args = { ...args, defaultCurrent: 1 };
  }
  const projectId = args.projectId;
  const url = baseUrl + '/project/' + projectId + '/issues';
  return instance.post(url, {
    current: args.current,
    pageSize: args.pageSize,
    total: args.total,
    defaultCurrent: args.defaultCurrent,
  });
}

export function apiGetAvailableProjectIssuesSize(args = {}) {
  const projectId = args.projectId;
  const url = baseUrl + '/project/' + projectId + '/issues/size';
  return instance.get(url);
}

export function apiFetchProjectList(args = {}) {
  return instance.get(`${baseUrl}/projects?page=${args.page}&pageSize=${args.pageSize}`);
}

export function apiFetchProject(args = {}) {
  return instance.get(`${baseUrl}/projects/${args.projectId}`);
}
export function apiIssueDetail(args = {}) {
  return instance.get(`${baseUrl}/issues/${args.issueId}`);
}
export function apiFetchIssueList(args = {}) {
  return instance.get(
    `${baseUrl}/issues?projectId=${args.projectId}&page=${args.page}&pageSize=${
      args.pageSize
    }&type=${args.type}&status=${args.status}&interaction=${args.interaction}`,
  );
}

export function apiupdateIssueStatus(args = {}) {
  return instance.put(`/issues?issueId=${args.issueId}&status=${args.status}`);
}

export function apiUploadImage(args = {}) {
  let uri = args.uri;
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('file', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(`${baseUrl}/upload`, options);
}

export function apiFetchforeman(args = {}) {
  return instance.get(`${baseUrl}/user/foreman?projectId=${args.projectId}`);
}

export function apiCreateIssues(args = {}) {
  return instance.post(baseUrl + '/issues', {
    name: args.name,
    type: args.type,
    status: 1,
    description: args.description,
    handlerId: args.handerId,
    projectId: args.projectId,
    imagePath: args.imagePaths,
  });
}

export function apiCreatecomment(args = {}) {
  return instance.post(baseUrl + '/comment', {
    issueId: args.issueId,
    username: args.username,
    content: args.content,
    imagePath: args.imagePaths,
    replyToId: args.replyToId,
  });
}
