<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="!settingStore.refreshState" />
    </transition>
  </router-view>
</template>

<script setup lang='ts'>
import {useSettingStore} from '@/store/setting'
import {nextTick, watch} from 'vue'

const settingStore = useSettingStore()

watch(() => settingStore.refreshState,(val) => {
  if(val){
    nextTick(() => {
      settingStore.refreshState = false
    })
  }
})
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>