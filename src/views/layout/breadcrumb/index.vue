<template>
    <div class="breadcrumb">
        <el-icon class="icon">
            <component :is="settingStore.foldState?'Expand':'Fold'" @click="changeFoldState"></component>
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight" class="crumb">
            <el-breadcrumb-item :to="item.path" v-for="(item) in route.matched" :key="item.path" v-show="item.meta.title">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span class="title">{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>

    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import {useSettingStore} from '@/store/setting'

const route = useRoute()
const settingStore = useSettingStore()

const changeFoldState = () => {
    settingStore.setFoldState()
}
</script>

<style lang="scss" scoped>
.breadcrumb {
    height: 100%;
    display: flex;
    align-items: center;

    .icon {
        margin: 0 10px;
        cursor: pointer;
    }

    .title {
        margin-left: 5px;
        vertical-align: top;
    }

}
</style>