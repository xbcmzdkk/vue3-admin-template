<template>
    <el-table :data="menuList" style="width: 100%;" row-key="id" border>
        <el-table-column label="名称" prop="name" />
        <el-table-column label="权限值" prop="code" />
        <el-table-column label="修改时间" prop="updateTime" />
        <el-table-column label="操作">
            <template #="{ row }">
                <el-button type="primary" size="small" :disabled="row.level === 4 ? true : false" @click="addMenu(row)">{{
                    row.level ===
                    3 ? '添加功能' : '添加菜单' }}</el-button>
                <el-button type="primary" size="small" :disabled="row.level === 1 ? true : false"
                    @click="editMenu(row)">编辑</el-button>
                <el-popconfirm :title="`确定删除${row.name}?`" @confirm="delMenu(row.id)" width="300px">
                    <template #reference>
                        <el-button type="primary" size="small" :disabled="row.level === 1 ? true : false">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogState" :title="menuParams.id ? '编辑菜单' : '添加菜单'" width="30%">
        <el-form :model="menuParams" ref="formRef" :rules="rules">
            <el-form-item label="名称" prop="name">
                <el-input v-model="menuParams.name" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="code">
                <el-input v-model="menuParams.code" placeholder="请输入权限值"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogState = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { getMenuListApi, addOrEditMenuApi, delMenuApi } from '@/api/acl/menu'
import { Menu } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus';
let menuList = ref<Menu[]>([])
let dialogState = ref(false)
let formRef = ref()
let menuParams = ref<Menu>({
    id: undefined,
    code: '',
    name: '',
    pid: 0,
    level: 0
})
let rules = ref({
    name: [{ required: true, tirgger: 'change', message: '此为必填项' }],
    code: [{ required: true, tirgger: 'change', message: '此为必填项' }]
})
onMounted(() => {
    getMenuList()
})
const getMenuList = async () => {
    let result = await getMenuListApi()
    if (result.code === 200) {
        menuList.value = result.data
    }
}
const addMenu = (row: Menu) => {
    menuParams.value = {
        id: undefined,
        code: '',
        name: '',
        pid: 0,
        level: 0
    }
    menuParams.value.level = row.level + 1
    menuParams.value.pid = row.id as number
    dialogState.value = true
    formRef.value.resetFields()
}
const editMenu = (row: Menu) => {
    menuParams.value = row
    dialogState.value = true
}
const confirm = async () => {
    let result = await addOrEditMenuApi(menuParams.value)
    if (result.code === 200) {
        dialogState.value = false
        ElMessage({ type: 'success', message: menuParams.value.id ? '更新成功' : '添加成功' })
        getMenuList()
    }
}
const delMenu = async (id: number) => {
    let result = await delMenuApi(id)
    if (result.code === 200) {
        ElMessage({ type: 'success', message: '删除成功' })
        getMenuList()
    }else{
        ElMessage({type:'error',message:'操作失败'})
    }
}
</script>

<style></style>