<template>
    <template v-for="item in menus" :key="item.path">
        <template v-if="!item.meta?.hidden">
            <el-menu-item v-if="!item.children" :index="item.path">
                <el-icon>
                    <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>
            <el-menu-item v-if="item.children?.length == 1 && item.name == 'layout'" :index="item.path">
                <el-icon>
                    <component :is="item.children[0].meta.icon" />
                </el-icon>
                <span>{{ item.children[0].meta.title }}</span>
            </el-menu-item>
            <el-sub-menu v-if="item.children?.length > 0 && item.name !== 'layout'" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon" />
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menus="item.children"></Menu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang='ts'>
defineProps(['menus'])
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style lang="scss" scoped>
.menu {
    color: #fff;
}
</style>