import request from '@/utils/request'
import type {getUserApiRes,Records,getUserRoleApiRes,editUserRoleApiParams} from './type'

enum API {
    GET_USER='/admin/acl/user/',
    ADD_USER='/admin/acl/user/save',
    EDIT_USER='/admin/acl/user/update',
    GET_USER_ROLE='/admin/acl/user/toAssign/',
    EDIT_USER_ROLE='/admin/acl/user/doAssignRole',
    DELETE_USER='/admin/acl/user/remove/',
    DELETE_USERS='/admin/acl/user/batchRemove'
}

export const getUserApi = (page:number,limit:number,username:string) => request.get<any,getUserApiRes>(API.GET_USER + `${page}/${limit}/?username=${username}`)

export const addOrUpdateUserApi = (data:Records) => {
    if(data.id){
       return request.put<any,any>(API.EDIT_USER,data)
    }else{
        return request.post<any,any>(API.ADD_USER,data)
    }
}

export const getUserRoleApi = (id:number) => request.get<any,getUserRoleApiRes>(API.GET_USER_ROLE+id)

export const editUserRoleApi = (data:editUserRoleApiParams) => request.post<any,any>(API.EDIT_USER_ROLE,data)

export const delUserApi = (id:number) => request.delete<any,any>(API.DELETE_USER+id)

export const delUsersApi = (idList:number[]) => request.delete<any,any>(API.DELETE_USERS,{data:idList})