<template>
    <div class="login">
        <div class="login-wrapper">
            <el-form
            :model="loginForm"
            :rules="rules"
            ref="form"
            label-width="100px"
            label-position="top"
            class="demo-ruleForm"
            >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive, toRefs, getCurrentInstance } from 'vue';
import { Message } from 'element3';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {
        const router = useRouter();
        const store = useStore();
        const form = ref(null);
        const loginForm = reactive({
            username: '',
            password: ''
        });
        const rules = reactive({
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在3到15个字符', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在3到15个字符', trigger: 'blur'}
                ]
            }
        });

        //登录
        function submitForm() { 
            form.value.validate((valid) => { 
                if (valid) {
                    Message({
                        message: 'submit',
                        type: 'success'
                    });
                    //保存用户信息
                    store.commit('saveUser', loginForm.username);
                    //跳转
                    router.push({ name: 'Home'});
                } else { 
                    return false;
                }
            });
        }
        //重置
        function resetForm() { 
            form.value.resetFields();
        }
        return {
            form,
            loginForm,
            ...toRefs(rules),
            submitForm,
            resetForm
        }
    }

}

</script>

<style scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-image: url('../assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.login-wrapper {
    width: 280px;
    height: auto;
    background: rgb(255 255 255 / 74%);
    padding: 30px;
}
</style>