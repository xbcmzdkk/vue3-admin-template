interface common {
    code: number,
    message: string,
    ok: boolean
}

export interface getRoleListApiRes extends common {
    data: {
        records: Role[],
        total: number
    }
}

export interface Role {
    id?: number,
    createTime?: string,
    updateTime?: string,
    roleName: string,
    remark?: null
}

export interface getPermissionListApiRes extends common {
    data:permisson[]
 }

export interface permisson {
    id: number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: string,
    toCode: string,
    type: number,
    status: null,
    level: number,
    select:boolean,
    children:permisson[]
}