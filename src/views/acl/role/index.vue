<template>
    <el-card>
        <el-form inline class="form">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名" @keydown="enter" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="search" :disabled="keyword ? false : true">搜索</el-button>
                <el-button type="primary" size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
        <el-button type="primary" icon="plus" @click="addRole">添加职位</el-button>
        <el-table style="margin: 10px 0;" :data="roleList" border>
            <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center" width="300px">
                <template #="{ row }">
                    <el-button type="primary" icon="User" size="small" @click="setPermission(row)">分配权限</el-button>
                    <el-button type="primary" icon="Edit" size="small" @click="editRole(row)">编辑</el-button>
                    <el-popconfirm @confirm="delRole(row.id)" :title="`确定删除${row.roleName}?`" width="300px">
                        <template #reference>
                            <el-button type="primary" icon="Delete" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[7, 9, 11]"
            :background="true" layout=" prev, pager, next, jumper,-> ,sizes,total," :total="total"
            @size-change="handleSizeChange" @current-change="getRoleList" />
    </el-card>
    <el-dialog v-model="dialogState" title="添加职位" width="40%">
        <el-form :model="roleParams" :rules="rules" ref="formref">
            <el-form-item label="职位名称：" prop="roleName">
                <el-input v-model="roleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogState = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <el-drawer v-model="drawerState">
        <template #header>
            <h4>分配权限</h4>
        </template>
        <template #default>
            <el-tree ref="treeRef" :data="permissionList" show-checkbox node-key="id" default-expand-all :default-checked-keys="rolePermissionId"
                :props="defaultProps" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawerState = false">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useSettingStore } from '@/store/setting'
import { getRoleListApi, addOrEditRoleApi, delRoleApi,getPermissionListApi,setRolePermissionApi } from '@/api/acl/role'
import type { Role,permisson } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus';
const settingStore = useSettingStore()
let keyword = ref<string>('')
let roleList = ref<Role[]>([])
let pageNo = ref<number>(1)
let pageSize = ref<number>(7)
let total = ref<number>(400)
let dialogState = ref<boolean>(false)
let formref = ref()
let drawerState = ref(false)
let permissionList = ref<permisson[]>([])
let rolePermissionId = ref<number[]>([])
let treeRef = ref()
let roleParams = ref<Role>({
    roleName: ''
})
let rules = ref({
    roleName: [{ required: true, trigger: 'change', message: '职位名称为必填项' }]
})
const defaultProps = {
  children: 'children',
  label: 'name',
}
onMounted(() => {
    getRoleList()
})
const getRoleList = async (page = 1) => {
    pageNo.value = page
    let reuslt = await getRoleListApi(pageNo.value, pageSize.value, keyword.value)
    if (reuslt.code === 200) {
        roleList.value = reuslt.data.records
        total.value = reuslt.data.total
    }
}
const handleSizeChange = () => {
    getRoleList()
}
const search = () => {
    getRoleList()
    keyword.value = ''
}
const enter = (e: any) => {
    if (e.code === 'Enter' && keyword.value) {
        getRoleList()
        keyword.value = ''
    }
}
const reset = () => {
    settingStore.setRefreshState()
}
const addRole = () => {
    dialogState.value = true
    roleParams.value.id = undefined
    roleParams.value.roleName = ''
    formref.value.resetFields()
}
const editRole = (row: Role) => {
    dialogState.value = true
    Object.assign(roleParams.value, row)

}
const confirm = async () => {
    let result = await addOrEditRoleApi(roleParams.value)
    if (result.code === 200) {
        ElMessage({ type: 'success', message: roleParams.value.id ? '更新成功' : '添加成功' })
        getRoleList(roleParams.value.id ? pageNo.value : 1)
    }
    dialogState.value = false
}
const delRole = async (id: number) => {
    let result = await delRoleApi(id)
    if (result.code === 200) {
        ElMessage({ type: 'success', message: '删除成功' })
        getRoleList(roleList.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
}

const setPermission = async(row:Role) => {
    rolePermissionId.value = []
    Object.assign(roleParams.value,row)
    let result = await getPermissionListApi(row.id as number)
    if(result.code === 200){
        permissionList.value = result.data
        rolePermissionId.value =  getUserPermissionId(permissionList.value,[])
        drawerState.value = true
    }
    
}
const confirmClick = async () => {
    let checkedId =  treeRef.value.getCheckedKeys()
    let halfCheckedId =  treeRef.value.getHalfCheckedKeys()
    let permissionId = checkedId.concat(halfCheckedId)
    let result = await setRolePermissionApi(roleParams.value.id as number,permissionId)
    if(result.code === 200){
        ElMessage({type:'success',message:'分配权限成功'})
        drawerState.value = false
        getRoleList(pageNo.value)
    }
}
const getUserPermissionId = (data:permisson[],initArr:number[]) => {
    data.map(item => {
        if(item.select && item.level == 4){
            initArr.push(item.id)
        }
        if(item.children.length>0){
            getUserPermissionId(item.children,initArr)
        }
    })
    return initArr
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    justify-content: space-between;

    .el-form-item {
        margin: 0;
    }
}
</style>