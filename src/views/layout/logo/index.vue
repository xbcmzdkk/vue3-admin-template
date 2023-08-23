<template>
    <div class="logo">
        <img :src="setting.logo" alt="">
        <span>{{setting.name}}</span>
    </div>
</template>

<script setup lang='ts'>
import setting from '@/setting'
</script>

<style lang="scss" scoped> 
.logo{
    height: $logo-height;
    width: 100%;
    display: flex;
    align-items: center;
    img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-right: 20px;
        margin-left: 10px;
    }
    span{
        color: #fff;
        font-size: 24px;
    }
}
</style>