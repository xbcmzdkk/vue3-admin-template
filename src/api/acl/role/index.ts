import request from "@/utils/request";
import type {getRoleListApiRes,Role,getPermissionListApiRes} from './type'
enum API {
    GET_ROLE='/admin/acl/role/',
    ADD_ROLE='/admin/acl/role/save',
    EDIT_ROLE='/admin/acl/role/update',
    DELELT_ROLE='/admin/acl/role/remove/',
    GET_PERMISSION_LIST='/admin/acl/permission/toAssign/',
    SET_ROLE_PERMISSION='/admin/acl/permission/doAssign'
}

export const getRoleListApi = (page:number,limit:number,roleName:string) => request.get<any,getRoleListApiRes>(API.GET_ROLE+`${page}/${limit}/?roleName=${roleName}`)

export const addOrEditRoleApi = (data:Role) => {
    if(data.id){
        return request.put<any,any>(API.EDIT_ROLE,data)
    }else{
        return request.post<any,any>(API.ADD_ROLE,data)
    }
}

export const delRoleApi = (id:number) => request.delete<any,any>(API.DELELT_ROLE+id)

export const getPermissionListApi = (id:number) => request.get<any,getPermissionListApiRes>(API.GET_PERMISSION_LIST+id)

export const setRolePermissionApi = (roleId:number,permissionId:number[]) => request.post<any,any>(API.SET_ROLE_PERMISSION + `/?roleId=${roleId}&permissionId=${permissionId}`)