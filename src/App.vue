<template>
  <div>我是App</div>
</template>

<script setup lang="ts">
let str = '我是测试str'
const fn = () => {
  console.log('我是测试fn', str)
}
fn()
</script>

<style></style>
