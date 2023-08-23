import request from "@/utils/request";
import type {getMenuListApiRes,Menu} from './type'

enum API {
    GET_MENU_LIST='/admin/acl/permission',
    ADD_MENU='/admin/acl/permission/save',
    EDIT_MENU='/admin/acl/permission/update',
    DELETE_MENU='/admin/acl/permission/remove/'
}

export const getMenuListApi = () => request.get<any,getMenuListApiRes>(API.GET_MENU_LIST)

export const addOrEditMenuApi = (data:Menu) => {
    if(data.id){
        return request.put<any,any>(API.EDIT_MENU,data)
    }else{
        return request.post<any,any>(API.ADD_MENU,data)
    }
}

export const delMenuApi = (id:number) => request.delete<any,any>(API.DELETE_MENU+id)