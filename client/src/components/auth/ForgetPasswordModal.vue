<template>
    <el-dialog
        v-model="forgetPasswordDialog"
        title="Forget password"
        width="30%"
        align-center
    >
        <el-form
            label-position="top"
            :model="forgetPasswordState"
            ref="forgetPasswordFormRef"
        >
            <el-form-item
                label="Email address"
                prop="email"
                :rules="emailRules"
            >
                <el-input
                    v-model="forgetPasswordState.email"
                    placeholder="Please enter your email address"
                    clearable
                />
                <span class="text-primary">
                    We will send you a link where you can reset your password
                </span>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <template v-if="!isSubmitButtonLoading">
                    <el-button @click="toggleForgetPasswordDialog">
                        <el-icon :size="18"><Close /></el-icon>
                        <span class="ms-1">Cancel</span>
                    </el-button>
                    <el-button type="primary" @click="submitHandler">
                        <el-icon :size="18"><Promotion /></el-icon>
                        <span class="ms-1">Send email</span>
                    </el-button>
                </template>
                <el-button v-else type="primary" :loading-icon="Eleme" loading>
                    Sending email
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { Close, Eleme, Promotion } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useStore } from 'vuex';
import allRules from '../../pages/auth/utils.js';

export default {
    props: ['forgetPasswordDialog', 'toggleForgetPasswordDialog'],
    components: { Promotion, Close, Eleme },
    setup(props) {
        const store = useStore();

        const forgetPasswordFormRef = ref();
        const forgetPasswordState = ref({ email: '' });
        const isSubmitButtonLoading = ref(false);

        return {
            forgetPasswordFormRef,
            forgetPasswordState,
            isSubmitButtonLoading,
            emailRules: allRules.email,
            submitHandler: async () => {
                isSubmitButtonLoading.value = true;
                try {
                    await store.dispatch(
                        'forgetPassword',
                        forgetPasswordState.value
                    );
                    ElNotification.success({
                        title: 'An email has been sent',
                        message:
                            'Please wait for sometime. You will get a email containing a click to reset your password.',
                    });
                    isSubmitButtonLoading.value = false;
                    props.toggleForgetPasswordDialog();
                } catch (error) {
                    ElNotification.error({
                        title: 'Could not sent email',
                        message: error.message,
                    });
                    isSubmitButtonLoading.value = false;
                }
            },
        };
    },
};
</script>

<style scoped></style>
