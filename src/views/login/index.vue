<template>
    <div class="login width100 height100 hideit relative">
        <div class="bg-box hideit width100 height100 absolute">
            <img src="http://diumx.com/static/imgs/1238.jpg" alt />
            <div class="bgmask absolute width100 height100" style="background: rgba(0,0,0,0.46)"></div>
        </div>

        <div class="rotate-bg absolute">
            <div class="rotate-flip" :class="{ 'rotate-o': rotate }">
                <ul class="rotate-front absolute transition3" :style="{ transform: 'translate3d(0,' + (ltp == 1 ? '0' : '-40px') + ', 0)' }">
                    <li class="flex center fcfff fsize24 login-logo">
                        <router-link to="/">
                            <img src="/img/login-logo-small.png" alt />
                        </router-link>
                    </li>
                    <li class="flex pb15">
                        <a :style="{ color: ltp == 1 ? '#fff' : '#999' }" @click="ltp = 1" class="transition3 flex1 center pointer">登录</a>
                        <a :style="{ color: ltp == 2 ? '#fff' : '#999' }" @click="ltp = 2" class="transition3 flex1 center pointer">注册</a>
                    </li>
                    <li class="relative flex">
                        <label></label>
                        <input v-model="form.email" class="input fcfff flex1 fsize16" placeholder="邮箱" type="text" />
                        <span class="cfm-span absolute"></span>
                    </li>
                    <li class="pt20 relative flex" v-if="ltp == 2">
                        <label></label>
                        <input v-model="form.code" class="input fcfff flex1 fsize16" maxlength="4" placeholder="验证码" type="text" />
                        <span class="cfm-span absolute"></span>
                        <button @click="sendcode" :style="{ background: passmail ? '#f90' : '#999' }" class="absolute btn-send button pointer">{{ cutdown <= 0 ? '获取验证码' : (cutdown + '秒后重发') }}</button>
                    </li>
                    <li class="pt20 relative flex">
                        <label></label>
                        <input @keyup.enter="login" v-model="form.password" class="input fcfff flex1 fsize16" maxlength="12" placeholder="密码，最少6位" type="password" />
                        <span class="cfm-span absolute"></span>
                    </li>
                    <li class="pt20 relative flex" v-if="ltp == 2">
                        <label></label>
                        <input @keyup.enter="login" v-model="form.agpassword" class="input fcfff flex1 fsize16" maxlength="12" placeholder="确认密码" type="password" />
                        <span class="cfm-span absolute"></span>
                    </li>
                    <li class="center flex pt15">
                        <button class="button dm-btn mt20" @click="login">确定</button>
                    </li>
                </ul>
                <ul class="rotate-back absolute transition3">
                    <li class="flex center fcfff fsize24 login-logo">
                        <router-link to="/">
                            <img src="/img/login-logo-small.png" alt />
                        </router-link>
                    </li>
                    <li class="flex pb15">
                        <a @click="rotate = false" class="fc999 flex1 center pointer">返回</a>
                        <a class="flex1 fcfff center pointer">找回密码</a>
                    </li>
                    <li class="relative flex">
                        <label></label>
                        <input v-model="form.email" class="input fcfff flex1 fsize16" placeholder="帐号" type="text" />
                        <span class="cfm-span absolute"></span>
                    </li>
                    <li class="pt20 relative flex">
                        <label></label>
                        <input v-model="form.code" class="input fcfff flex1 fsize16" maxlength="4" placeholder="验证码" type="text" />
                        <span class="cfm-span absolute"></span>
                        <button @click="sendcode" :style="{ background: passmail ? '#f90' : '#999' }" class="absolute btn-send button pointer">{{ cutdown <= 0 ? '获取验证码' : (cutdown + '秒后重发') }}</button>
                    </li>
                    <li class="pt20 relative flex">
                        <label></label>
                        <input v-model="form.password" class="input fcfff flex1 fsize16" maxlength="12" placeholder="新密码，最少6位" type="password" />
                        <span class="cfm-span absolute"></span>
                    </li>
                    <li class="pt20 relative flex">
                        <label></label>
                        <input v-model="form.agpassword" class="input fcfff flex1 fsize16" maxlength="12" placeholder="确认新密码" type="password" />
                        <span class="cfm-span absolute"></span>
                    </li>
                    <li class="center flex padtop15">
                        <button class="button dm-btn btn-green mt20" @click="login">确定</button>
                    </li>
                </ul>
            </div>
        </div>
        <p class="absolute about-p center width100">
            <a class="fsize13 pointer fcgreen" @click="rotate = !rotate">忘记密码</a>
            <span></span>
            <a class="fsize13 fcfff">管理员帐号：admin@qq.com，普通用户：normal@qq.com，密码都是：123456</a>
        </p>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { useRouter } from "vue-router"
import * as Account from '@api/Account'
import Storage from '@utils/Storage'
import { useStore } from 'vuex'
/** 路由 */
let router = useRouter()
let store = useStore()
let form = reactive({
    email: 'admin@qq.com',
    password: '123456',
    agpassword: '',
    code: ''
})
let ltp = ref(1)
let cutdown = ref(0)
let rotate = ref(false)
let passmail = computed(() => {
    return form.email.length > 0
})
/** 倒计时 */
function cutdownTime() {
    cutdown.value--
    if (cutdown.value < 1) { return }
    setTimeout(() => {
        cutdownTime()
    }, 1000)
}
/** 倒计时结束，帐号验证通过发送验证码 */
function sendcode() {
    if (cutdown.value !== 0 || !passmail.value) { return }
    cutdown.value = 60
    cutdownTime()
    ElMessage.success('发送成功，请注意查收！')
}
function login() {
    let p = {
        password: form.password,
        email: form.email,
    }
    if (!rotate.value && ltp.value === 1) {
        Account.login(p).then((res: any) => {
            if (res.code == 200) {
                ElMessage.success('登录成功！')
                Storage.set('token', res.data)
                /** 关闭login页面 */
                store.dispatch('layout/RemoveTab', { path: '/login' }).then(() => {
                    /** 跳转到首页 */
                    router.replace('/')
                })
            } else {
                ElMessage.error(res.message || '登陆有误，请打开控制台查看错误信息')
            }
        }).catch(err => {
            console.log(err)
            ElMessage.error(err)
        })
    } else {
        ElNotification({
            type: 'warning',
            title: '不提供此功能',
            message: '花木兰前 / 后端服务只提供基本功能',
            duration: 0
        })
    }
}

</script>
<style lang="less">
.login {
    .bg-box img {
        width: 110%;
        height: 110%;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
        filter: blur(25px);
    }
    input:focus + .cfm-span {
        transform: scaleX(1);
    }
}

.rotate-flip {
    position: relative;
    transition: 0.6s;
    transform-style: preserve-3d;
}
.rotate-front {
    z-index: 2;
}
.rotate-back {
    z-index: 1;
    margin-top: -40px;
}
.rotate-front,
.rotate-back {
    position: absolute;
    backface-visibility: hidden;
}
.rotate-back {
    transform: rotateY(-180deg);
}
.rotate-bg {
    width: 86%;
    max-width: 328px;
    left: 50%;
    top: 50%;
    z-index: 3;
    transform: translate3d(-50%, -50%, 0);
    height: 264px;
}
.rotate-o {
    transform: rotateY(180deg);
}
.rotate-bg .input {
    width: 300px;
    padding: 12px 14px;
    border-bottom: 1px solid #ccc;
}
.rotate-bg .btn-send {
    right: 10px;
    top: 25px;
    padding: 5px 6px;
    color: #fff;
    background: #f90;
}
.login-logo img {
    height: 40px;
    margin-right: 15px;
}
.login-logo {
    font-size: 40px;
    transform: translateY(-80px);
}
.cfm-span {
    left: 0;
    right: 0;
    height: 2px;
    bottom: 0px;
    transform: scaleX(0);
    transition: 0.45s cubic-bezier(0.23, 1, 0.32, 1);
    background: #7e57c2;
}

.about-p {
    bottom: 20px;
    z-index: 3;
}
.about-p span {
    height: 11px;
    width: 1px;
    background: #999;
    display: inline-block;
    margin: 0 10px;
}
.dm-btn {
    width: 120px;
    height: 40px;
    background: #f70a04;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}
</style>