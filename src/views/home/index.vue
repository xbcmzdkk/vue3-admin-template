<template>
    <el-card>
        <div class="box">
            <img :src="userStore.userInfo.avatar" alt="" class="avatar">
            <div class="bottom">
                <h3 class="title">{{ getTime() }}好 {{ userStore.userInfo.name }}!</h3>
                <p class="subtitle">{{ setting.name }}</p>
            </div>
        </div>
    </el-card>
    <div class="bottoms">
        <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
</template>
  
<script setup lang="ts">
import { getTime } from '@/utils/time'
//引入用户相关的仓库,获取当前用户的头像、昵称
import { useUserStore } from '@/store/user';
import setting from '@/setting'
//获取存储用户信息的仓库对象
let userStore = useUserStore();

</script>
  
<style scoped lang="scss">
.box {
    display: flex;
    align-items: center;
    z-index: 0;
    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .bottom {
        height: 80px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
            font-size: 26px;
            font-weight: bold;
        }

        .subtitle {
            font-style: italic;
            color: rgba(109, 92, 92, 0.3);
            font-size: 20px;
        }
    }
}

.bottoms {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>