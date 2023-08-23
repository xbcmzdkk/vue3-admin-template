import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useSettingStore = defineStore('setting',() => {
    const foldState = ref(false)
    const refreshState = ref(false)
    const setFoldState = () => {
        foldState.value = ! foldState.value
    }
    const setRefreshState = () => {
        refreshState.value = true
    }
    return {
        foldState,
        refreshState,
        setFoldState,
        setRefreshState
    }
})