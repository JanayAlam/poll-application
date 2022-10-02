<template>
    <div class="mt-2">
        <el-card class="box-card">
            <el-form
                label-position="top"
                label-width="120px"
                :model="loginState"
                ref="loginFormRef"
                :rules="rules"
                status-icon
            >
                <div class="row" style="min-height: 333px">
                    <div
                        class="col d-flex justify-content-center align-items-center"
                    >
                        <div class="text-center">
                            <div class="display-5 fw-bold text-primary">
                                Welcome Back
                            </div>
                            <div class="mt-0">
                                <div>
                                    Now login to your account with your username
                                    and password
                                </div>
                                <div>
                                    Do not have an account?
                                    <router-link :to="{ name: 'register' }">
                                        <el-link type="primary">
                                            Create one.
                                        </el-link>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="col d-flex justify-content-center align-items-center"
                    >
                        <div class="w-100">
                            <el-form-item label="Username" prop="username">
                                <el-input
                                    v-model="loginState.username"
                                    placeholder="Please enter your username"
                                    clearable
                                />
                            </el-form-item>
                            <el-form-item
                                label="Password"
                                prop="password"
                                class="mb-2"
                            >
                                <el-input
                                    v-model="loginState.password"
                                    type="password"
                                    placeholder="Please input your password"
                                    show-password
                                    clearable
                                />
                            </el-form-item>
                            <div
                                class="d-flex justify-content-between align-items-center"
                            >
                                <el-checkbox
                                    label="Remember me"
                                    v-model="loginState.rememberMe"
                                />
                                <el-link
                                    type="primary"
                                    @click="toggleForgetPasswordDialog"
                                >
                                    <el-icon :size="16"><MagicStick /></el-icon>
                                    <span class="ms-1">Forget password</span>
                                </el-link>
                            </div>
                            <template v-if="!isSubmitButtonLoading">
                                <el-button
                                    type="primary"
                                    @click="submitHandler"
                                >
                                    <el-icon :size="16">
                                        <Key />
                                    </el-icon>
                                    <span class="ms-1">Login</span>
                                </el-button>
                                <form-reset-vue :formRef="loginFormRef" />
                            </template>
                            <el-button
                                v-else
                                type="primary"
                                :loading-icon="Eleme"
                                loading
                                >Processing</el-button
                            >
                        </div>
                    </div>
                </div>
            </el-form>
            <forget-password-modal
                :toggleForgetPasswordDialog="toggleForgetPasswordDialog"
                :forgetPasswordDialog="forgetPasswordDialog"
            />
        </el-card>
    </div>
</template>

<script setup>
import { Eleme, Key, MagicStick } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ForgetPasswordModal from '../../components/auth/ForgetPasswordModal.vue';
import FormResetVue from '../../components/form/FormReset.vue';
import allRules from './utils.js';

document.title = 'Login';
const defaultFormState = {
    username: '',
    password: '',
    rememberMe: false,
};
const loginFormRef = ref();
const loginState = ref({ ...defaultFormState });

const isSubmitButtonLoading = ref(false);

const router = useRouter();
const store = useStore();

const rules = ref({
    username: allRules.username,
    password: allRules.password,
});

const submitHandler = () => {
    isSubmitButtonLoading.value = true;

    if (!loginFormRef.value) return;
    loginFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                await store.dispatch('login', loginState.value);
                ElNotification.success({
                    title: 'Successfully logged in to the account',
                    message: 'You have now access to the private routes',
                });
                router.push({ name: 'home' });
            } catch (error) {
                loginState.value.password = '';
                ElNotification.error({
                    title: 'Could not sign in',
                    message: error.message,
                });
            } finally {
                isSubmitButtonLoading.value = false;
            }
        } else {
            ElNotification.error({
                title: 'Please enter valid data',
                message: 'Try again after entering valid data',
            });
            isSubmitButtonLoading.value = false;
            return false;
        }
    });
};

const forgetPasswordDialog = ref(false);
const toggleForgetPasswordDialog = () => {
    forgetPasswordDialog.value = !forgetPasswordDialog.value;
};
</script>

<style scoped>
</style>
