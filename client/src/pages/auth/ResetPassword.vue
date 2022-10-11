<template>
    <div class="mt-2">
        <div class="row">
            <div class="col-md-8 offset-md-2 col-sm-12">
                <el-card>
                    <div class="text-center">
                        <h1 class="display-6 fw-bold text-primary">
                            Reset Password
                        </h1>
                        <p>
                            Set up a new password to get access of your account
                        </p>
                        <hr class="text-primary" />
                    </div>
                    <el-form
                        label-position="top"
                        label-width="120px"
                        :model="resetPasswordState"
                        ref="resetPasswordFormRef"
                        :rules="rules"
                        @submit="submitHandler"
                        status-icon
                    >
                        <el-form-item label="Password" prop="password">
                            <el-input
                                type="password"
                                v-model="resetPasswordState.password"
                                placeholder="Please enter your username"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item
                            label="Confirm password"
                            prop="confirmPassword"
                        >
                            <el-input
                                type="password"
                                v-model="resetPasswordState.confirmPassword"
                                placeholder="Please retype your password"
                                clearable
                            />
                        </el-form-item>
                        <template v-if="!isSubmitButtonLoading">
                            <el-button type="primary">
                                <el-icon :size="16">
                                    <Select />
                                </el-icon>
                                <span class="ms-1">Update password</span>
                            </el-button>
                            <form-reset-vue :formRef="resetPasswordFormRef" />
                        </template>
                        <el-button
                            v-else
                            type="primary"
                            :loading-icon="Eleme"
                            loading
                            >Processing</el-button
                        >
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Eleme, Select } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import FormResetVue from '../../components/form/FormReset.vue';
import { allRules } from './utils.js';

document.title = 'Reset password';

const defaultFormState = {
    password: '',
    confirmPassword: '',
};

const resetPasswordFormRef = ref();
const resetPasswordState = ref({ ...defaultFormState });
const isSubmitButtonLoading = ref(false);

const router = useRouter();
const route = useRoute();
const store = useStore();

const validatePassword = (_rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input confirm password'));
    } else if (value !== resetPasswordState.value.password) {
        callback(new Error('Confirm password does not matched'));
    } else {
        callback();
    }
};

const rules = ref({
    password: allRules.password,
    confirmPassword: [
        {
            required: true,
            message: 'Please retype the password',
            trigger: 'blur',
        },
        { validator: validatePassword, trigger: 'blur' },
    ],
});

const submitHandler = () => {
    isSubmitButtonLoading.value = true;

    if (!resetPasswordFormRef.value) return;
    resetPasswordFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                await store.dispatch('resetPassword', {
                    ...resetPasswordState.value,
                    userId: route.params.userId,
                    token: route.params.token,
                });
                ElNotification.success({
                    title: 'Password reset successful',
                    message: 'You can now log in with your new password',
                });
                router.push({ name: 'login' });
            } catch (error) {
                loginState.value.password = '';
                ElNotification.error({
                    title: 'Could not changed the password',
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
</script>

<style scoped></style>
