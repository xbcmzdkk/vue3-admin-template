import request from "@/utils/request";
import type {loginApiParams,loginApiRes,getUserInfoRes} from './type'
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}
export const loginApi = (data:loginApiParams) => request.post<any,loginApiRes>(API.LOGIN_URL,data)

export const getUserInfoApi = () => request.get<any,getUserInfoRes>(API.USERINFO_URL)

export const logoutApi = () => request.post<any>(API.LOGOUT_URL)