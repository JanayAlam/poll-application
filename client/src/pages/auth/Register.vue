<template>
    <div class="mt-2">
        <el-card class="box-card">
            <template #header>
                <div class="card-header text-center">
                    <div class="display-6 text-primary fw-bold">
                        Creating a new account
                    </div>
                    <div class="my-2">
                        Already got an account?
                        <router-link :to="{ name: 'login' }">
                            <el-link type="primary"> Sign in. </el-link>
                        </router-link>
                    </div>
                </div>
            </template>
            <el-form
                label-position="top"
                label-width="120px"
                :model="registerState"
                ref="registerFormRef"
                :rules="rules"
                status-icon
            >
                <div class="row">
                    <div class="col">
                        <el-form-item label="First Name" prop="firstName">
                            <el-input
                                v-model="registerState.firstName"
                                placeholder="Please enter your first name"
                                clearable
                            />
                        </el-form-item>
                    </div>
                    <div class="col">
                        <el-form-item label="Last Name" prop="lastName">
                            <el-input
                                v-model="registerState.lastName"
                                placeholder="Please enter your last name"
                                clearable
                            />
                        </el-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <el-form-item label="Username" prop="username">
                            <el-input
                                v-model="registerState.username"
                                placeholder="Please enter a unique username"
                                clearable
                            />
                        </el-form-item>
                    </div>
                    <div class="col">
                        <el-form-item label="Email Address" prop="email">
                            <el-input
                                v-model="registerState.email"
                                type="email"
                                placeholder="Please enter a unique and valid email address"
                                clearable
                            />
                        </el-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <el-form-item label="Password" prop="password">
                            <el-input
                                v-model="registerState.password"
                                type="password"
                                placeholder="Please input a password"
                                show-password
                                clearable
                            />
                        </el-form-item>
                    </div>
                    <div class="col">
                        <el-form-item
                            label="Confirm Password"
                            prop="confirmPassword"
                        >
                            <el-input
                                v-model="registerState.confirmPassword"
                                type="password"
                                placeholder="Please retype your password"
                                show-password
                                clearable
                            />
                        </el-form-item>
                    </div>
                </div>
                <div class="mb-2">
                    <el-checkbox
                        label="Accept terms and conditions"
                        v-model="registerState.checked"
                    />
                </div>
                <template v-if="!isSubmitButtonLoading">
                    <el-button
                        type="primary"
                        @click="submitHandler"
                        :disabled="!registerState.checked"
                    >
                        <el-icon :size="16">
                            <Plus />
                        </el-icon>
                        <span class="ms-1">Sign up</span>
                    </el-button>
                    <form-reset-vue :formRef="registerFormRef" />
                </template>
                <el-button v-else type="primary" :loading-icon="Eleme" loading
                    >Loading</el-button
                >
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import FormResetVue from '../../components/form/FormReset.vue';
import { allRules } from './utils.js';

document.title = 'Register';
const defaultFormState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    checked: false,
};
const registerFormRef = ref();
const registerState = ref({ ...defaultFormState });

const isSubmitButtonLoading = ref(false);

const router = useRouter();
const store = useStore();

const validatePassword = (_rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input confirm password'));
    } else if (value !== registerState.value.password) {
        callback(new Error('Confirm password does not matched'));
    } else {
        callback();
    }
};

const rules = ref({
    ...allRules,
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

    if (!registerFormRef.value) return;
    registerFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                await store.dispatch('register', registerState.value);
                ElNotification.success({
                    title: 'Successfully created an account',
                    message:
                        'Please check your email account to get validation code to validate the account',
                });
                router.push({ name: 'home' });
            } catch (error) {
                ElNotification.error({
                    title: 'Account has not been created',
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
