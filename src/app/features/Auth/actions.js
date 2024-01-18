import { USER_LOGIN, USER_LOGOUT } from './constans'
export const userLogin = (payload) => ({
type: USER_LOGIN,
payload
});
export const userLogout = () => ({
type: USER_LOGOUT
});