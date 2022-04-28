import { ROLES } from './roles';

export const HOME = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';
export const PROJECT_ITEM = `/${ROLES.ADMIN}/projects/:id`;
export const ANNOTATOR_ITEM = `/${ROLES.ANNOTATOR}/projects/:inviteUrl`;
