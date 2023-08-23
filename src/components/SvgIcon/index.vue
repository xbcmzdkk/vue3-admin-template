<template>
    <svg :style="{width,height}">
        <use :href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang='ts'>
defineProps({
    prefix:{
        type:String,
        default:'#icon-'
    },
    name:{
        type:String,
        reuqired:true
    },
    color:{
        type:String,
        default:'#333'
    },
    width:{
        type:String,
        default:'16px'
    },
    height:{
        type:String,
        default:'16px'
    }
})
</script>

<style></style>