<template>
    <el-card>
        <el-form inline class="form">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="search" :disabled="keyword?false:true">搜索</el-button>
                <el-button type="primary" size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
        <div>
            <el-button type="primary" size="default" @click="addUser">添加</el-button>
            <el-button type="danger" size="default" @click="delUsers" :disabled="delUserId.length>0?false:true">批量删除</el-button>
        </div>
        <el-table border style="margin: 10px 0;" :data="userList" @selection-change="selectChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="id" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="User" @click="editRole(row)">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="editUser(row)">编辑</el-button>
                    <el-popconfirm :title="`确定删除${row.username}?`" width="300" @confirm="deluser(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9]" :background="true"
            layout=" prev, pager, next, jumper,-> ,sizes,total," :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
    <!-- 添加|更新用户 -->
    <el-drawer v-model="drawerState">
        <template #header>
            <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <template #default>
            <el-form :model="userParams" :rules="rules" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
                    <el-input v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>

        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
    <!-- 分配角色 -->
    <el-drawer v-model="drawerState1">
        <template #header>
            <h4>分配角色</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input v-model="userParams.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="职位列表" class="check-form-item">
                    <el-checkbox v-model="checkAll" @change="handleCheckAllChange"
                        :indeterminate="isIndeterminate">全选</el-checkbox>
                    <el-checkbox-group v-model="userRole" @change="handleCheckedChange">
                        <el-checkbox v-for="role in allRole" :key="role.id" :label="role">{{ role.roleName }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus';
import { getUserApi, addOrUpdateUserApi, getUserRoleApi, editUserRoleApi,delUserApi,delUsersApi } from '@/api/acl/user'
import { Records, User, Role } from '@/api/acl/user/type'
import {useSettingStore} from '@/store/setting'
const settingStore = useSettingStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>()
let userList = ref<Records[]>([])
let drawerState = ref<boolean>(false)
let drawerState1 = ref<boolean>(false)
let formRef = ref()
let allRole = ref<Role[]>([])
let userRole = ref<any>([])
let checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
let delUserId = ref<number[]>([])
let keyword = ref<string>('')
let userParams = ref<User>({
    username: '',
    name: '',
    password: ''
})
let rules = ref({
    username: [
        { required: true, trigger: 'change', min: 5, max: 10, message: '用户名长度为5-10位' }
    ],
    name: [
        { required: true, trigger: 'change', message: '请输入用户昵称' }
    ],
    password: [
        { required: true, trigger: 'change', min: 6, max: 16, message: '密码长度为6-16位' }
    ]
})

onMounted(() => {
    getUserList()
})
const getUserList = async (page = 1) => {
    pageNo.value = page
    let result = await getUserApi(pageNo.value, pageSize.value,keyword.value)
    if (result.code == 200) {
        userList.value = result.data.records
        total.value = result.data.total
    }
}
const handleSizeChange = () => {
    getUserList()
}
const handleCurrentChange = () => {
    getUserList(pageNo.value)
}
const addUser = () => {
    drawerState.value = true
    userParams.value.id = undefined
    userParams.value.password = ''
    userParams.value.username = ''
    userParams.value.name = ''
    nextTick(() => {
        formRef.value.resetFields()

    })
}
const editUser = (row: User) => {
    drawerState.value = true
    Object.assign(userParams.value, row)
}
const cancelClick = () => {
    drawerState.value = false
}
const confirmClick = () => {
    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            let result: any = await addOrUpdateUserApi(userParams.value)
            if (result.code == 200) {
                drawerState.value = false
                ElMessage({
                    type: 'success',
                    message: userParams.value.id ? '更新成功' : '添加成功'
                })
                getUserList()
            } else {
                drawerState.value = false
                ElMessage({
                    type: 'error',
                    message: userParams.value.id ? '更新失败' : '添加失败'
                })
            }
        }

    })

}
const editRole = async (row: User) => {
    Object.assign(userParams.value, row)
    let result = await getUserRoleApi((row.id) as number)
    if (result.code === 200) {
        allRole.value = result.data.allRolesList
        userRole.value = result.data.assignRoles
        drawerState1.value = true
    }
}
const cancel = () => {
    drawerState1.value = false
}
const confirm = async () => {
    let params = {
        userId: (userParams.value.id as number),
        roleIdList: userRole.value.map((item: any) => {
            return item.id as number
        })
    }
    let result = await editUserRoleApi(params)
    if (result.code === 200) {
        ElMessage({
            type: 'success',
            message: '分配角色成功'
        })
        getUserList(pageNo.value)
    } else {
        ElMessage({
            type: 'error',
            message: '分配角色失败'
        })
    }
    drawerState1.value = false
}
const handleCheckAllChange = (val: any) => {
    userRole.value = val ? allRole.value : []
    isIndeterminate.value = false
}
const handleCheckedChange = (val: any) => {
    checkAll.value = val.length === allRole.value.length
    isIndeterminate.value = val.length > 0 && val.length < allRole.value.length

}
const deluser = async(id:number) => {
    let result = await delUserApi(id)
    console.log(result)
    if(result.code === 200){
        ElMessage({type:'success',message:'删除成功'})
        getUserList(userList.value.length>1? pageNo.value:pageNo.value-1)
    }
}
const delUsers = async() => {
    let result = await delUsersApi(delUserId.value)
    console.log(result)
    if(result.code === 200){
        ElMessage({type:'success',message:'批量删除成功'})
        getUserList(userList.value.length>1? pageNo.value:pageNo.value-1)
    }
}
const selectChange = (val:User[]) => {
    delUserId.value = val.map(item => (item.id as number))
}

const search = () => {
    getUserList()
    keyword.value = ''
}

const reset = () => {
    settingStore.setRefreshState()
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

:deep(.check-form-item .el-form-item__content) {
    flex-direction: column;
    align-items: flex-start;
}
</style>