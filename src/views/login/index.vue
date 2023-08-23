<template>
    <div class="login">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form ref="elform" class="login-box" :model="FormData" :rules="FormRules">
                    <div class="title">Hello</div>
                    <div class="subtitle">欢迎进入xx后台</div>
                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="FormData.username"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="FormData.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" type="primary" class="btn-login" @click="loginHandler">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/user'
import { useRouter,useRoute } from 'vue-router'
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time'
const userStore = useUserStore()
const router = useRouter()
const route= useRoute()
const FormData = reactive({
    username: 'admin',
    password: 'atguigu123'
})
const FormRules = reactive({
    username: [
        { required: true, min: 4, max: 10, message: '用户名长度为4-10位', trigger: 'change' },
    ],
    password: [
        { required: true, min: 6, max: 10, message: '密码长度为6-10位', trigger: 'change' }
    ]
})
const elform = ref()
//登录按钮状态
const loading = ref(false)
const loginHandler = () => {
    elform.value.validate((valid:boolean) => {
        if (valid) {
            loading.value = true
            userStore.login(FormData).then(() => {
                //登录成功，路由跳转
                router.push((route.query.redirect) as string || '/')
                ElNotification({
                    type: 'success',
                    message: '欢迎回来',
                    title: `hi,${getTime()}好！`
                })
                loading.value = false

            }).catch(err => {
                ElNotification({
                    type: 'error',
                    message: err.message
                })
                loading.value = false
            })
        }
    })

}


</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    &-box {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url("@/assets/images/login_form.png") no-repeat;
        padding: 40px;

        .title {
            color: #fff;
            font-size: 40px;
        }

        .subtitle {
            color: #fff;
            font-size: 20px;
            margin: 20px 0;
        }

        .btn-login {
            width: 100%;
        }

    }
}</style>