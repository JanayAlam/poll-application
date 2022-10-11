<template>
    <div class="mt-2">
        <div class="row">
            <div class="col-md-8 offset-md-2 col-sm-12">
                <el-card>
                    <div class="text-center">
                        <h1 class="display-6 fw-bold text-primary">
                            Reset Password
                        </h1>
                        <p>Set up a new password to get access of your account</p>
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
                                v-model="resetPasswordState.confirmPassword"
                                placeholder="Please retype your password"
                                clearable
                            />
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import allRules from './utils.js';

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

const rules = ref({
    password: allRules.password,
    confirmPassword: allRules.confirmPassword,
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
