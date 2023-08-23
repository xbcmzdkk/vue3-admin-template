interface common {
    code: number,
    message: string,
    ok: boolean
}

export interface getMenuListApiRes extends common{
    data:Menu[]
}

export interface Menu {
    id?: number,
    createTime?: string,
    updateTime?: string,
    pid: number,
    name: string,
    code: string,
    toCode?: string,
    type?: number,
    status?: null,
    level: number,
    children?: Menu[],
    select?: boolean
}

