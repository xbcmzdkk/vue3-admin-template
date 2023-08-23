export interface getUserApiRes extends common{
    data:{
        records:Records[]
        total:number,
    },

}

export interface common {
    code:number,
    message:string,
    ok:boolean
}

export interface Records{
    id?: number,
    createTime?: string,
    updateTime?: string,
    username: string,
    password: string,
    name: string,
    phone?: null,
    roleName?: string
}

export interface User {
    username:string,
    name:string,
    password:string,
    id?:number
}

export interface getUserRoleApiRes extends common{
    data:{
        assignRoles:Role[],
        allRolesList:Role[]
    }
}

export interface Role{
    id?: number,
    createTime?: string,
    updateTime?: string,
    roleName: string,
    remark: null
}

export interface editUserRoleApiParams{
    roleIdList:number[],
    userId:number
}
