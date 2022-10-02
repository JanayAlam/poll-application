<template>
    <el-button type="warning" plain @click="resetHandler">
        <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" class="me-2" />
        Reset
    </el-button>
</template>

<script>
export default {
    name: 'FormReset',
    props: ['formRef'],
    setup(props) {
        const resetHandler = () => {
            if (!props.formRef) return;
            props.formRef.resetFields();
        };

        return { resetHandler };
    },
};
</script>

<style></style>
