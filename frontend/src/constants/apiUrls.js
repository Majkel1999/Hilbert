// AUTH
export const USER_URL = '/user';
export const LOGIN_URL = '/user/login';
export const REGISTER_URL = '/user/register';
export const REFRESH_URL = 'user/refresh';

// PROJECT
export const PROJECT_URL = '/project';
export const PROJECT_DATA_URL = (projectId) => `${PROJECT_URL}/${projectId}`;
export const TAG_URL = (inviteUrl) => `tag/${inviteUrl}`;

// WS
export const WS_URL = (projectId) => `${PROJECT_URL}/${projectId}/ws`;
