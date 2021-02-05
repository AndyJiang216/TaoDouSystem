<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">个人影视中心</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="name">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 请输入对应身份权限的用户名密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import {login,getAllUsers} from '@/api/index.js'
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: 'beidou',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            const usernamePassword=this.param
            login('/login',usernamePassword).then(successResponse=>{
                console.log(JSON.stringify(successResponse))
                /*if(successResponse.code==20000){
                    this.$message.success('登录成功');
                    this.$store.commit('LOGIN',successResponse.data.token)
                    this.$store.commit('SETROLE',successResponse.data.role)
                    localStorage.setItem('ms_username', usernamePassword.username);
                    this.$router.push('/');
                }*/
                getAllUsers('/findAllUsers').then(result=>{
                    console.log(result);
                })
            }).catch(failureResponse=>{
                console.error(JSON.stringify(failureResponse))
                return false
            })
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/loginBackground.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>